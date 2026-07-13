const Discord = require('discord.js')
const {
  MessageEmbed
} = require("discord.js");

module.exports = {
  name: "renameemoji",
  aliases: ['rename'],
  userPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  botPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  description: 'Rename a emoji',
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("Mention a emoji to rename");
    if (!args[1]) return message.channel.send("Give me a new emoji for that emoji")
    let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
    if (!emo) return message.channel.send("Mention a emoji from this server")
    if (message.guild.emojis.cache.get(emo)) {
      emo = message.guild.emojis.cache.get(emo)
    } else {
      return message.channel.send("Emoji not found")
    }
    if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
    console.log(emo)
    try {
      emo.setName(args.slice(1).join("_"))
      message.channel.send("The name for the emoji has been changed to " + args.slice(1).join("_"))
    } catch (err) {
      message.channel.send("An Error occured")
    }
  }
}