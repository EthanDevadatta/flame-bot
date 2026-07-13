const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'lock',
  description: 'Locks the mentioned channel',
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ["MANAGE_MESSAGES"],
  usage: 'lock [channel]',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    const channell = message.mentions.channels.first() || message.channel;

    if (!channell.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
      return message.reply(`${process.env.FAILURE_EMOJI} Channel is Already Locked!`)
    } else {
      await channell.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: false
      }).then(message.channel.permissionOverwrites.edit(message.author.id, {
        SEND_MESSAGES: true,
      })).then(message.channel.permissionOverwrites.edit(client.user.id, {
        SEND_MESSAGES: true,
      }))

      message.reply(`Locked <#${channell.id}>`)
    }
  },
};