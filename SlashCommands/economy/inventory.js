const {
    MessageEmbed
} = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "inventory",
    description: "Check all your items in inventory",
    options: [{
        name: 'user',
        description: 'the user you want to view inventory of',
        type: 'USER',
        required: false
    }],
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('user') || interaction.user;
        let result = await cs.getUserItems({
            user: user,      
        });
        let inv = result.inventory.slice(0, 10)
        const embed = new MessageEmbed()
            .setTitle(user.tag + `'s Inventory in Empty!`)
            .setColor('RED')
        let pos = 0;
        for (key of inv) {
            pos++
            embed.addField(`${pos}) **${key.name}:**`, `Amount: ${key.amount}`);
            embed.setTitle(user.tag + '\'s Inventory!')
            embed.setColor('RED')
        }
        interaction.followUp({
            embeds: [embed],
            
        })
    }
}