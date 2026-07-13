const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Topgg = require('@top-gg/sdk')
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "vote",
    description: "Vote For Flame Bot",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const topgg = new Topgg.Api(process.env.DBL_TOKEN)
        const voteCheck = await topgg.hasVoted(message.author.id)


        const components = (state) => [

            new MessageActionRow().addComponents(

                new MessageButton()
                .setLabel('Top.gg')
                .setStyle('LINK')
                .setDisabled(state)
                .setURL('https://top.gg/bot/796279185080582185/vote'),
                new MessageButton()
                .setLabel('Discordbotlist.com')
                .setStyle('LINK')
                .setDisabled(state)
                .setURL('https://discordbotlist.com/bots/flame-bot')
            )

        ]

        if (voteCheck) {
            const voted = new MessageEmbed()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setDescription("Whoops, looks like you're already voted today!\nRemember that you can only vote every **12 hours**.")
                .setColor("RED")
            message.reply({
                embeds: [voted],
                components: components(true)
            })

        } else {

            const embed = new MessageEmbed()
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTitle("Vote for Flame Bot").setURL("https://discord.gg/FCP2HWksBU")
                .setDescription(`You can vote and support me! There are 2 ways to vote!\nVoting on [top.gg](https://top.gg/bot/796279185080582185/vote) and [discordbotlist.com](https://discordbotlist.com/bots/flame-bot) will support and you get you rewards 🔥\n\nVote for me using the buttons below!`)
                .setColor("RED")

            await message.reply({
                embeds: [embed],
                components: components(false)
            })
        }
    }
}