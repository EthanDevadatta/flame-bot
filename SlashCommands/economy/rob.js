const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "rob",
    description: "Rob users and steal users money to your wallet",
    options: [
        {
            name: 'member',
            description: 'the member you want to rob',
            type: 'USER',
            required: true
        }
    ],
    run: async (client, interaction, options) => {
        try {
            const boiya = interaction.options.getUser('member')

            const bot = new MessageEmbed()
                .setDescription("You can't rob a bot that's illegal")
                .setColor('RANDOM')
            if (boiya.bot || boiya === client.user) return interaction.followUp({
                embeds: [bot],
            });

            let result = await cs.rob({
                user: interaction.user,
                user2: boiya,
                minAmount: 200,
                successPercentage: 10,
                cooldown: 25, //25 seconds
                maxRob: 3000
            });
            const success = new MessageEmbed()
                .setDescription(`${interaction.user.username} you robbed ${boiya} and got away with \`$${result.amount}\`!`)
                .setColor('RED')
            const caught = new MessageEmbed()
                .setDescription(`${interaction.user.username} you robbed ${boiya} and got caught and you payed \`$${result.amount}\` to ${boiya}!`)
                .setColor('RED')
            const lowwallet = new MessageEmbed()
                .setDescription(`${boiya} have less than \`$${result.minAmount}\` coins to rob.`)
                .setColor('RED')
            const lowmoney = new MessageEmbed()
                .setDescription(`You need atleast \`$${result.minAmount}\` coins to rob somebody.`)
                .setColor('RED')
            const time = new MessageEmbed()
                .setTitle(`Slow Down!`)
                .setDescription(`> You can use this command every **20 seconds**!\n> Try again in: **${result.time}** `)
                .setColor('#2F3136')

            if (result.error) {
                if (result.type === 'time') return interaction.followUp({
                    embeds: [time],
                });
                if (result.type === 'low-money') return interaction.followUp({
                    embeds: [lowmoney],
                });
                if (result.type === 'low-wallet') return interaction.followUp({
                    embeds: [lowwallet],
                })
                if (result.type === 'caught') return interaction.followUp({
                    embeds: [caught],
                })
            } else {
                if (result.type === 'success') return interaction.followUp({
                    embeds: [success],
                })

            }
        } catch (error) {
            console.log(error)
            return interaction.followUp({
                content: 'An error occurred',
            });

        };

    }
}