const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "yearly",
    description: "Collect your yearly money",
    premium: true,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const CurrencySystem = require("currency-system");
        const cs = new CurrencySystem;
        let result = await cs.yearly({
            user: interaction.user.id,
            guild: {
                id: null
            },
            amount: 10000,
        });
        if (result.error) return interaction.followUp(`You have used yearly recently Try again in ${result.time}`);
        else interaction.followUp(`You have earned \`$${result.amount}\`. Your streak is now ${result.rawData.streak.yearly}`);

    }
}