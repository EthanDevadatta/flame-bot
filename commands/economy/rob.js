const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "rob",
    description: "Rob users and steal users money to your wallet",
    usage: "<user>",
    run: async (client, message, args) => {
        try {
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

            const bot = new MessageEmbed()
                .setDescription("You can't rob a bot that's illegal")
                .setColor('RANDOM')
            if (user.bot || user === client.user) return message.reply({
                embeds: [bot],
                allowedMentions: {
                    repliedUser: false
                }
            });
            if (!user) return message.reply({
                content: 'Sorry, you forgot to mention somebody.',
                allowedMentions: {
                    repliedUser: false
                }
            });

            let result = await cs.rob({
                user: message.author,
                user2: user,
                
                minAmount: 200,
                successPercentage: 10,
                cooldown: 25, //25 seconds
                maxRob: 3000
            });
            const success = new MessageEmbed()
                .setDescription(`${message.author.username} you robbed ${user} and got away with $\`${result.amount}\`!`)
                .setColor('RED')
            const caught = new MessageEmbed()
                .setDescription(`${message.author.username} you robbed ${user} and got caught and you payed $\`${result.amount}\` to ${user}!`)
                .setColor('RED')
            const lowwallet = new MessageEmbed()
                .setDescription(`${user} have less than $\`${result.minAmount}\` coins to rob.`)
                .setColor('RED')
            const lowmoney = new MessageEmbed()
                .setDescription(`You need atleast $\`${result.minAmount}\` coins to rob somebody.`)
                .setColor('RED')
            const time = new MessageEmbed()
                .setTitle(`Slow Down!`)
                .setDescription(`> You can use this command every **20 seconds**!\n> Try again in: **${result.time}** `)
                .setColor('#2F3136')

            if (result.error) {
                if (result.type === 'time') return message.reply({
                    embeds: [time],
                    allowedMentions: {
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                });
                if (result.type === 'low-money') return message.reply({
                    embeds: [lowmoney],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
                if (result.type === 'low-wallet') return message.reply({
                    embeds: [lowwallet],
                    allowedMentions: {
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                })
                if (result.type === 'caught') return message.reply({
                    embeds: [caught],
                    allowedMentions: {
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                })
            } else {
                if (result.type === 'success') return message.reply({
                    embeds: [success],
                    allowedMentions: {
                        allowedMentions: {
                            repliedUser: false
                        }
                    }
                })

            }
        } catch (error) {
            console.log(error)
            return message.reply({
                content: 'An error occurred',
                allowedMentions: {
                    repliedUser: false
                }
            });

        };

    }
}