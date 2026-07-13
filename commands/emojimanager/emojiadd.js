const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: 'emojiadd',
  aliases: ['emoji-add', 'add-emoji', 'addemoji'],
  userPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  botPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  description: 'Add emojis to your server',
  usage: '<emojis>',
  run: async (client, message, args) => {
    const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
    if (!emojis) return message.reply(`Provide The emojis to add`);
    emojis.forEach(emote => {
      let emoji = Discord.Util.parseEmoji(emote);
      if (emoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"
          }`
        message.guild.emojis.create(
          `${Link}`,
          `${`${emoji.name}`}`
        ).then(em => message.channel.send(em.toString() + " Added!")).catch(error => {
          message.reply(`An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n\`\`\``)
        })

      }
    })
  }
}