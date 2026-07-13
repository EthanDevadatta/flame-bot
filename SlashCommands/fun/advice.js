const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "advice",
    description: "Get some useful advice for yourself! It will help you in the future.",
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        fetch(`https://luminabot.xyz/api/json/advice`)
            .then((res) => res.json())
            .then((json) => {
                const embed = new MessageEmbed()
                    .addField("Advice:", `${json.advice}`)
                    .setTimestamp()

                interaction.followUp({
                    embeds: [embed]
                })
            })
    }
}