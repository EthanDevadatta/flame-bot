const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "daily",
    description: "Reedem money everyday",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let result = await cs.daily({
            user: message.author,
            amount: 2000,
        })
        let kek = message.author

        const nocookieforbadpeople = new MessageEmbed()
            .setTitle(`Slow Down!`)
            .setDescription(`> You can use this command every **1 day**!\n> Try again in: **${result.time}** `)
            .setColor('#2F3136')
        if (result.error) {
            return message.reply({
                embeds: [nocookieforbadpeople],

            });
        } else {
            const dailycookie = new MessageEmbed()
                .setTitle(`Your Daily Coins`)
                .setDescription(`You received **${result.amount.toLocaleString()}**$ coins!`)
                .setColor('RED')
            message.reply({
                embeds: [dailycookie],

            });
        }
    }
}