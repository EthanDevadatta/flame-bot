const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "weekly",
    description: "Grab some Weekly Coins",
    premium: true,
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const CurrencySystem = require("currency-system");
        const cs = new CurrencySystem;
        let result = await cs.weekly({
            user: message.author.id,
            guild: {
                id: null
            },
            amount: 25000,
        });
        if (result.error) return message.reply(`You have already collected this.. try again in ${result.time}`)
        else message.reply(`You have earned \`$${result.amount}\` as your weekly payment. Your streak is now ${result.rawData.streak.weekly}`);
    }
}