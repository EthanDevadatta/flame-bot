const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');

module.exports = {
  name: 'hack-ban',
  aliases: ['hac-ban'],
  description: 'Forcebans a member outside the guild',
  usage: '<user-id> [reason]',
  botPermissions: ["BAN_MEMBERS"],
  userPermissions: ["BAN_MEMBERS"],
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {

    const userID = args[0]
    const reason = args.slice(1).join(" ") || "No Reason Given"

    if (!userID) return message.reply({
      content: `${process.env.FAILURE_EMOJI} Please give the user id`,
      allowedMentions: {
        repliedUser: false
      }
    })

    client.users.fetch(userID).then(async user => {
      await message.guild.members.ban(userID, {
        reason: reason
      })
      return message.reply({
        content: `**${user.tag}** has been banned by force, Reason: *${reason}*`,
        allowedMentions: {
          repliedUser: false
        }
      })
    }).catch(error => {
      console.log(error)
    });
  },
};