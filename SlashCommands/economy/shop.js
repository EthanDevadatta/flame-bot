const {
    MessageEmbed
} = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "shop",
    description: "shows the global shop",
    run: async (client, interaction, options) => {
        try{
        let result = await cs.getShopItems({
            id: null
        });
        
            let inv = result.inventory;
        
            const embed = new MessageEmbed()
                .setTitle('Item Shop')
                .setDescription('Here are the following items you can buy, to buy an item do \`f!buy <item bumber\`')
                .setColor('RED')
            for (let key in inv) {
                embed.addField(`${parseInt(key) + 1} ・ **${inv[key].name}:**  \` $${inv[key].price} \` `,`> ${inv[key].description}`)
            }
            interaction.followUp({
                embeds: [embed],

            })
        } catch (err) {
            interaction.followUp('Nothing is there in the shop')
        }
    }
}