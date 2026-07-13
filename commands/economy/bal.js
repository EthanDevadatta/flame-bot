const {
    MessageEmbed
} = require('discord.js')
const CurrencySystem = require('currency-system')
const cs = new CurrencySystem;

module.exports = {
    name: "balance",
    aliases: [`bal`],
    usage: '[user]',
    description: "Shows your bank and wallet cash amount",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else if (args[0]) {
            user = message.guild.members.cache.get(args[0])
            if (user) user = user.user;
        } else if (!args[0]) {
            user = message.author;
        }

        let result = await cs.balance({
            user: user,
        });
        const maths = (result.bank / result.rawData.bankSpace) * 100

        const chicken = new MessageEmbed()
            .setTitle(`${user.tag}'s Balance`)
            .setDescription(`\\💳 **Wallet**: \` $${result.wallet.toLocaleString()} \`\n\\🏦 **Bank**: \` $${result.bank.toLocaleString()} / ${result.rawData.bankSpace.toLocaleString()} \` (\`${maths}%\`)`)
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()
            .setColor('RED')
        message.reply({
            embeds: [chicken],

        });
    }
}