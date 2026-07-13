const {
    MessageEmbed
} = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "inventory",
    aliases: [`inv`],
    description: "Check all your items in inventory",
    usage: '[user]',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args
     * @returns 
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
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
        message.reply({
            embeds: [embed],
            
        })
    }
}