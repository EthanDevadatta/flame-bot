const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojify",
  description: "Emojify your text",
  options: [{
    name: "text",
    description: "Input text to emojify",
    type: "STRING",
    required: true,
  }],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const { letter } = interaction.options.get("text");

    const specialCodes = {
      '0': ':zero:',
      '1': ':one:',
      '2': ':two:',
      '3': ':three:',
      '4': ':four:',
      '5': ':five:',
      '6': ':six:',
      '7': ':seven:',
      '8': ':eight:',
      '9': ':nine:',
      '#': ':hash:',
      '*': ':asterisk:',
      '?': ':grey_question:',
      '!': ':grey_exclamation:',
      ' ': '   '
    }

    const text = args.join(" ").toLowerCase().split('').map(letter => {
      if (/[a-z]/g.test(letter)) {
        return `:regional_indicator_${letter}:`
      } else if (specialCodes[letter]) {
        return `${specialCodes[letter]}`
      }
      return letter;
    }).join('');

    interaction.followUp({ content: `${text}`})
  },
};