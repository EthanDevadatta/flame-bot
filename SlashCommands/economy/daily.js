const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "daily",
    description: "Reedem money everyday using this command",
    run: async (client, interaction, options) => {
        let result = await cs.daily({
            user: interaction.user,
            amount: 2000,
        })
        let kek = interaction.user

        const nocookieforbadpeople = new MessageEmbed()
            .setTitle(`Slow Down!`)
            .setDescription(`> You can use this command every **1 day**!\n> Try again in: **${result.time}** `)
            .setColor('#2F3136')
        if (result.error) {
            return interaction.followUp({
                embeds: [nocookieforbadpeople],

            });
        } else {
            const dailycookie = new MessageEmbed()
                .setTitle(`Your Daily Coins`)
                .setDescription(`You received **${result.amount.toLocaleString()}**$ coins!`)
                .setColor('RED')
                interaction.followUp({
                embeds: [dailycookie],

            });
        }
    }
}