const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
    Message,
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
    run: async (client, message, args) => {
        const CurrencySystem = require("currency-system");
        const cs = new CurrencySystem;
        let result = await cs.yearly({
            user: Message.author.id,
            guild: {
                id: null
            },
            amount: 10000,
        });
        if (result.error) return message.reply(`You have used yearly recently Try again in ${result.time}`);
        else message.reply(`You have earned \`$${result.amount}\`. Your streak is now ${result.rawData.streak.yearly}`);

    }
}