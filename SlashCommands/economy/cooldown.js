const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "cooldown",
    description: "Shows all your economy cooldowns",
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
        let result = await cs.info(interaction.user);
        const embed = new MessageEmbed()
            .setTitle('Your Economy Cooldowns')
            .setColor('RED');
        let unUsed = '';
        let cantBeUsed = '';
        for (const [key, value] of result.info) {
            if (value.used) unUsed += `- ${key}\n`;
            else cantBeUsed += `- ${key} ( ${value.timeLeft} )\n`;
        }
        embed.addField('Commands that you cant use:', cantBeUsed || 'None');
        interaction.followUp({
            embeds: [embed]
        })
    }
}