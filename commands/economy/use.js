const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "use",
    description: "Use a Item",
    maintenance: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        try {
            let item = args.join(" ");
            if (!item) return message.reply("What item you wana use?")
            let haveItem = false;
            const arr = await cs.getUserItems({
                user: message.user,
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
                    return message.reply("Unknown error occured see console.")
                } else return message.reply("You've used " + item + " and earned $" + money)

            } else return message.reply("Please buy the item first!")
        } catch (e) {
            return message.reply("Invalid Item")
        }
    }
}