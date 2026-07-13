const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js')
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "add-item",
    description: "Add items to shop",
    options: [{
            name: 'item',
            description: 'item name to add',
            required: true,
            type: 'STRING',
        },
        {
            name: 'price',
            description: 'item price to add',
            required: true,
            type: 'INTEGER',
        },
        {
            name: 'description',
            description: 'item description to add',
            required: true,
            type: 'STRING',
        }
    ],
    run: async (client, interaction, options) => {
        try {
            const name = interaction.options.getString('item')
            const price = interaction.options.getInteger('price')
            const des = interaction.options.getString('description')
            let result = await cs.addItem({
                guild: {
                    id: null
                },
                inventory: {
                    name: name,
                    price: price,
                    description: des
                }
            });
            const error1 = new MessageEmbed()
                .setDescription('There was a error')
                .setColor('RED')

            const error2 = new MessageEmbed()
                .setDescription('There was a error, invalid price!')
                .setColor('RED')

            const error3 = new MessageEmbed()
                .setDescription('There was a error, You didnt specify price!')
                .setColor('RED')

            const error4 = new MessageEmbed()
                .setDescription('There was a error, No data recieved!')
                .setColor('RED')

            const Noerror = new MessageEmbed()
                .setDescription('Done! Successfully added `' + name + '` to the shop!')
                .setColor('RED')

            if (result.error) {
                if (result.type == 'No-Inventory-Name') return interaction.followUp({
                    embeds: [error1],
                })
                if (result.type == 'Invalid-Inventory-Price') return interaction.followUp({
                    embeds: [error2],
                })
                if (result.type == 'No-Inventory-Price') return interaction.followUp({
                    embeds: [error3],
                })
                if (result.type == 'No-Inventory') return interaction.followUp({
                    embeds: [error4],
                })
            } else interaction.followUp({
                embeds: [Noerror],
            })
        } catch (e) {
            console.log(e)
        }
    }
}