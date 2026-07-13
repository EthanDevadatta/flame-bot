const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "share",
    aliases: ['pay', 'transfer'],
    description: "Share money to a User",
    usage: '<user> <amount>',
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
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0]);
            if (user) user = user.user;;
        } else if (!args[0]) {
            return message.reply(process.env.FAILURE_EMOJI + " Specify a user!");
        }

        if (user.bot || user === client.user) return message.reply(process.env.FAILURE_EMOJI + " Why u want to give your cash to a bot!?");
        if (!client.users.cache.get(user.id) || !user) return message.reply(process.env.FAILURE_EMOJI + ' Mention someone to give the cash to');

        let amount = args[1];
        if (!amount) return message.reply(process.env.FAILURE_EMOJI + " Enter amount of money to add.");
        if (amount.includes("-")) return message.reply(process.env.FAILURE_EMOJI + " You can't send negitive money.")
        let money = parseInt(amount);

        let result = await cs.transferMoney({
            user: message.author,
            user2: user,
            
            amount: money
        });
        if (result.error) return message.reply(process.env.FAILURE_EMOJI + `You don't have enough money in your wallet.`);
        else {
            const embed = new MessageEmbed()
                .setDescription(`${process.env.SUCCESS_EMOJI} ${message.author.username}, Successfully transfered \` $${result.money.toLocaleString()} \` to **${result.user2.username}**`)
                .setColor('GREEN')
            message.reply({
                embeds: [embed]
            })
        }
    }
}