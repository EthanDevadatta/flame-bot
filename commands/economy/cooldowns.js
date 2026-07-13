const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "cooldown",
    aliases: ['cooldowns'],
    description: "Shows all your economy cooldowns",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const CurrencySystem = require("currency-system");
        const cs = new CurrencySystem;
        let result = await cs.info(
            message.author
        );
        const embed = new MessageEmbed()
            .setTitle('Cooldowns of ' + message.author.tag)
            .setColor('RED');
        let unUsed = '';
        let cantBeUsed = '';
        for (const [key, value] of result.info) {
            if (value.used) unUsed += `- ${key}\n`;
            else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
        }
        embed.addField('Commands That you can\'t use:', cantBeUsed || 'None');
        message.reply({
            embeds: [embed]
        })
    }
}