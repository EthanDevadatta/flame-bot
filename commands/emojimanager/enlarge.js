const Discord = require('discord.js');
module.exports = {
  name: 'enlarge',
  description: `Enlarge an emoji!`,
  aliases: ['el'],
  usage: '<emoji>',
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send('Please specify a emoji')
    const parsedEmoji = Discord.Util.parseEmoji(args[0]);
    if (parsedEmoji.id === null) return message.channel.send(`Please specify a valid custom emoji`)
    const link = `https://cdn.discordapp.com/emojis/${parsedEmoji.id}.${parsedEmoji.animated ? "gif" : "png"}`;
    const embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle(`Enlarged the Emoji!`)
      .setURL('https://flamebot.gq')
      .setImage(link)
    message.reply({embeds: [embed]});
  }
} 