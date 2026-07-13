const {
    MessageEmbed
} = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "shop",
    aliases: ['store'],
    description: "Explore store's items",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
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
            message.reply({
                embeds: [embed],

            })
        } catch (err) {
            message.reply('Nothing is there in the shop')
        }
    }
}