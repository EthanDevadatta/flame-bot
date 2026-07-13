const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'emojiinfo',
    aliases: ['ei', 'emoji-info'],
    description: 'Get info on a emoji',
    usage: '<emoji>',
    run: async (client, message,[emote]) => {``
        const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1');

        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex);
      if (!emoji) return message.channel.send('Please send a valid custom emoji from this server only!');

        const authorFetch = await emoji.fetchAuthor();
        const checkOrCross = (bool) => bool ? process.env.SUCCESS_EMOJI : process.env.FAILURE_EMOJI;

        const embed = new Discord.MessageEmbed()
        .setDescription(`**Emoji information**\n\nGeneral\n**❯ ID:** ${emoji.id}\n**❯ URL:** [Link to Emoji](${emoji.url})\n**❯ AUTHOR:** ${authorFetch.tag} (${authorFetch.id})\n**❯ TIME CREATED:** ${moment(emoji.createdTimestamp).format('LT')} ${moment(emoji.createdTimestamp).format('LL')}\n**❯ ACCESSIBLE BY:** ${emoji.roles.cache.map((role) => role.name).join(', ') || 'Everyone'}\n\nOther\n**❯ Requires Colons:** ${checkOrCross(emoji.requiresColons)}\n**❯ Deletable:** ${checkOrCross(emoji.deletable)}\n**❯ Animated:** ${checkOrCross(emoji.animated)}\n**❯ Managed:** ${checkOrCross(emoji.managed)} `)
        .setColor('#ff0000')
        .setThumbnail(emoji.url)

        return message.channel.send({embeds:[embed]});
    }
}