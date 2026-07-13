const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    usage: '<amount>',
    description: "Withdraw money from your bank to your wallet",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        try {
        let money = args.join(" ");
        if (!money) return message.reply({
            embeds: [amount],
            
        });

        let result = await cs.withdraw({
            user: message.author,
            
            amount: money
        })
        let mukesh = message.author
        const amount = new MessageEmbed()
            .setDescription('Enter The Amount You Want To Withdraw!')
            .setColor('RED')
        const cookiemoni = new MessageEmbed()
            .setDescription(`Specify The Amount To Withdraw!`)
            .setColor('RED')
        const blackmoni = new MessageEmbed()
            .setDescription(`${mukesh} You Can't Withdraw Negative Money!`)
            .setColor('RED')
        const poorcookieseller = new MessageEmbed()
            .setDescription(`${mukesh} You Don't Have That Much Money In Your Bank!`)
            .setColor('RED')
        const UltraPoorCookieSeller = new MessageEmbed()
            .setDescription(`${mukesh} You Don't Have Any Money To Withdraw!`)
            .setColor('RED')
        const RichCookieSeller = new MessageEmbed()
            .setDescription(`${mukesh} You Have Succesfully Withdraw'd All Your Money!`)
            .setColor('RED')
        const GibCookie = new MessageEmbed()
            .setDescription(`${mukesh} You Have Withdrawn \`$${result.amount.toLocaleString()}\` Coins`)
            .setColor('RED')

        if (result.error) {
            if (result.type === 'money') return message.reply({
                embeds: [cookiemoni],
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (result.type === 'negative-money') return message.reply({
                embeds: [blackmoni],
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (result.type === 'low-money') return message.reply({
                embeds: [poorcookieseller],
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (result.type === 'no-money') return message.reply({
                embeds: [UltraPoorCookieSeller],
                allowedMentions: {
                    repliedUser: false
                }
            });
        } else {
            if (result.type === 'all-success') return message.reply({
                embeds: [RichCookieSeller],
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (result.type === 'success') return message.reply({
                embeds: [GibCookie],
                allowedMentions: {
                    repliedUser: false
                }
            })
        }
    } catch(error) {
        return message.reply({
            embeds: [new MessageEmbed().setDescription(`Your Bank Has Nothing To Withdraw`).setColor('RED')],
            
        })
    }
    }
}