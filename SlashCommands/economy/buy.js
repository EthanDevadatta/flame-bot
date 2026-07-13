const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "buy",
    description: "Buy items from the shop",
    options: [
        {
            name: 'item',
            description: 'The Item You Want',
            type: 'INTEGER',
            required: true,
        }
    ],
    run: async (client, interaction, options) => {
        let thing = interaction.options.getInteger('item')
            let result = await cs.buy({
                user: interaction.user,
                item: thing
            });
            if (result.error) {
                if (result.type === 'No-Item') return interaction.followUp('Please provide valid item number');
                if (result.type === 'Invalid-Item') return interaction.followUp('item does not exists');
                if (result.type === 'low-money') return interaction.followUp(`**You don't have enough balance to buy this item!**`);
            } else return interaction.followUp(`**Successfully bought  \`${result.inventory.name}\` for $${result.inventory.price}**`)
        
    }
}