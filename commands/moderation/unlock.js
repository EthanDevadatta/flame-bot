const {
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'unlock',
  description: 'Unlocks the mentioned channel',
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ["MANAGE_MESSAGES"],
  usage: 'unlock <channel>',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    const channell = message.mentions.channels.first() || message.channel
    if (channell.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
      return message.reply(`${process.env.FAILURE_EMOJI} Channel is Already Unlocked!`)
    } else {
      await channell.permissionOverwrites.edit(message.channel.guild.roles.everyone, {
        SEND_MESSAGES: null
      });
      
      message.reply(`Unlocked <#${channell.id}>`)
    }
  },
};