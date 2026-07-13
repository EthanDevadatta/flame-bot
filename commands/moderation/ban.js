const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Bans a member from the guild',
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ["BAN_MEMBERS"],
  usage: '<user> [reason]',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    const target = message.mentions.members.first() || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ")) || message.guild.members.cache.get(args[0]);
    const reason = args.slice(1).join(" ") || "No Reason Given"

    if (!target) return message.reply({
      content: `${process.env.FAILURE_EMOJI} Mention a member to ban`,
      allowedMentions: {
        repliedUser: false
      }
    })

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply({
      content: `${process.env.FAILURE_EMOJI} You can\'t ban this member cause their role is higher than yours`,
      allowedMentions: {
        repliedUser: false
      }
    });
    if (target.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({
      content: `${process.env.FAILURE_EMOJI} I can't ban this member since thier role is higher than mine!`,
      allowedMentions: {
        repliedUser: false
      }
    });
    const Owner = await message.guild.fetchOwner();

    if (target.user.id === Owner.user.id) return message.reply({
      content: `${process.env.FAILURE_EMOJI} You can't ban the server owner!`,
      allowedMentions: {
        repliedUser: false
      }
    });

    const DmEmbed = new MessageEmbed()
      .setTitle('You Have Been Banned!')
      .setColor('RED')
      .setTimestamp()
      .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
      .setDescription(`You have been banned from ${message.guild.name}!\n**Reason:** \`${reason}\`\n**Moderator:** ${message.author.tag}`)

    await target.send({
      embeds: [DmEmbed]
    });
    target.ban({
      reason
    });

    const embed = new MessageEmbed()
      .setTitle('Successfully Banned!')
      .setColor('GREEN')
      .setTimestamp()
      .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
      .setDescription(`${process.env.SUCCESS_EMOJI} ${target.user.tag} has been successfully banned! Reason: *${reason}*`)

    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false
      }
    });
  },
};