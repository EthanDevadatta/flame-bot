const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const figlet = require("figlet");
const {
  promisify
} = require("util");
const figletAsync = promisify(figlet);

module.exports = {
  name: "ascii",
  description: "Shows Cool Ascii Art ",
  options: [{
    name: "text",
    description: "Enter the text you want to Ascii",
    type: 'STRING',
    required: true,
  }],
  run: async (client, interaction, args) => {

    let textContent = interaction.options.getString("text");
    let Result = await figletAsync(textContent);

    let embed = new MessageEmbed()
      .setColor('#2F3136')
      .setDescription("```" + Result + "```")
      .setTimestamp();

    if (textContent.length > 20)
      return interaction.followUp(`Please make shorter! | limit : 20`);

    interaction.followUp({
      embeds: [embed]
    });


  }
}