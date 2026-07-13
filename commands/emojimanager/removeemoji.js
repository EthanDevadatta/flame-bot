const Discord = require('discord.js')

module.exports = {
  name: "removeemoji",
  description: "Removes emoji from the server!",
  userPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  botPermissions: ['MANAGE_EMOJIS_AND_ STICKERS'],
  usage: '<emoji>',
  aliases: ['emoji-remove', 'remove-emoji', 'removeemoji'],
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Give a emoji to remove");
    let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
    if (!emo) return message.channel.send("Give a emoji to remove")
    if (message.guild.emojis.cache.get(emo)) {
      emo = message.guild.emojis.cache.get(emo)
    } else {
      return message.channel.send("Emoji not found")
    }
    if (!emo.name || !emo.id) return message.channel.send("Invalid emote argument");
    try {
      emo.delete()
      message.channel.send("The Emoji has been removed")
    } catch (err) {
      message.channel.send("An Error occured")
    }
  }
}