const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "use",
    description: "Use a item",
    maintenance: true,
    options: [{
        name: 'item',
        type: 'STRING',
        description: 'The name of the item',
        required: true,
    }, ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        try {
            let item = interaction.options.getString("item")
            let haveItem = false;
            const arr = await cs.getUserItems({
                user: interaction.user,
            });
            let i;
            for (key in arr.inventory) {
                if (arr.inventory[key].name.includes(item)) haveItem = true
                i = key;
            };
            if (haveItem) {
                // WILL ADD SOMETHING LATER
                if (result.error) {
                    console.log(result)
                    return interaction.followUp("Unknown error occured see console.")
                } else return interaction.followUp("You've used " + item + " and earned $" + money)

            } else return interaction.followUp("Please buy the item first!")
        } catch (e) {
            return interaction.followUp("Invalid Item")
        }
    }
}