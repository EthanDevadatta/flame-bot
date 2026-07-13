const {
  Client,
  Message,
  MessageEmbed
} = require('discord.js');
const ms = require('ms');
const humanize = require('humanize-duration');

module.exports = {
  name: 'slowmode',
  aliases: ['sm'],
  description: 'Sets the slowmode for a channel',
  userPermissions: ['MANAGE_CHANNELS'],
  botPermissions: ["MANAGE_CHANNELS"],
  usage: '<time>',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel;
    let time = message.mentions.channels.first() ? args[1] : args[0];
    if (time === 'reset' || time === 'off' || time === 'clear' || !time) {

      if (channel.rateLimitPerUser < 1) {
        message.reply({
          content: 'Slowmode is already off',
          allowedMentions: {
            repliedUser: false
          }
        })
        return
      }
      await channel.setRateLimitPerUser(0);
      return message.reply({
        content: 'Removed slowmode',
        allowedMentions: {
          repliedUser: false
        }
      })

    } else if (time) {
      let toMS = ms(time);
      let result = Math.floor(toMS / 1000);
      if (!result) {
        message.reply({
          content: `${process.env.FAILURE_EMOJI} Please tell me a valid time`,
          allowedMentions: {
            repliedUser: false
          }
        })
        return
      }

      if (result > 21601) {
        message.reply({
          content: `${process.env.FAILURE_EMOJI} Time should be less than 6hrs`,
          allowedMentions: {
            repliedUser: false
          }
        })
        return
      } else if (result < 1) {
        message.reply({
          content: `${process.env.FAILURE_EMOJI} Time should be more then 1s`,
          allowedMentions: {
            repliedUser: false
          }
        })
        return
      }

      await channel.setRateLimitPerUser(result);
      return message.reply({
        content: `${process.env.SUCCESS_EMOJI} <#${channel.id}> is now in slowmode for ${humanize(toMS)}`,
        allowedMentions: {
          repliedUser: false
        }
      })
    }
  }
}