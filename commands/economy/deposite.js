const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "deposite",
    aliases: ["dep"],
    usage: '<amount>',
    description: "Deposite money from your Wallet to your Bank",
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
            if (isNaN(money)) return message.reply({
                embeds: [new MessageEmbed().setDescription('Only Numbers Allowed No Strings').setColor('RED')],

            })

            let result = await cs.deposite({
                user: message.author,
                amount: money
            })
            let mukesh = message.author
            const amount = new MessageEmbed()
                .setDescription('Enter The Amount You Want To Deposite!')
                .setColor('RED')
            if (!money) return message.reply({
                embeds: [amount],

            });

            const cookiemoni = new MessageEmbed()
                .setDescription(`Specify The Amount To Deposite!`)
                .setColor('RED')
            const blackmoni = new MessageEmbed()
                .setDescription(`${mukesh} You Can't Deposite Negative Money!`)
                .setColor('RED')
            const poorcookieseller = new MessageEmbed()
                .setDescription(`${mukesh} You Don't Have That Much Money In Your Bank!`)
                .setColor('RED')
            const UltraPoorCookieSeller = new MessageEmbed()
                .setDescription(`${mukesh} You Don't Have Any Money To Deposite!`)
                .setColor('RED')
            const RichCookieSeller = new MessageEmbed()
                .setDescription(`${mukesh} You Have Succesfully Deposited All Your Money!`)
                .setColor('RED')
            const GibCookie = new MessageEmbed()
                .setDescription(`${mukesh} You Have Deposited \`$${result.amount.toLocaleString()}\` Coins`)
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
        } catch (error) {
            return message.reply({
                embeds: [new MessageEmbed().setDescription(`Your Wallet Has Nothing To Deposite`).setColor('RED')],

            })
        }
    }
}