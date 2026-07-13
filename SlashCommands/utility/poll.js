// async function reactEmojies(message, emojies) {
//     for (const emoji of emojies) {
//         await message.react(emoji);
//     }
// }

const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "poll",
    description: "Makes a poll, dont fill any option to make a yes/no poll.",
    // userPermissions: [""],
    // botPermissions: [""],
    // ownerOnly: false,
    options: [{
            name: "question",
            description: "The question of this poll!",
            type: "STRING",
            required: true
        },
        // options
        {
            name: "choices",
            description: "The choices of this poll, use | between each option!",
            type: "STRING",
            required: false
        },
    ],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {

        try {

            const question1 = interaction.options.getString("question");

            let num = {
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
                10: '🔟'
            };

            var questionRe = /"(.*)"/gmi
            let question = question1.match(questionRe)

            if (!questionRe) return interaction.followUp("You did not provide question");
            const optionsOption = interaction.options.getString("choices");
            let result = ""

            if (!optionsOption) {

                result += "<a:upvote:767586020027531314> ➜ Yes\n"
                result += "<a:downvote:767586020010754078> ➜ No"

                const embedpoll = new MessageEmbed()
                    .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL({
                        dynamic: true
                    }))

                    .setTitle(`${question1}`)
                    .setDescription(`React with one of the following to determine your choice!\n\n${result}`)
                    .setColor('AQUA')
                    .setTimestamp()

                return interaction.followUp({
                    embeds: [embedpoll]
                }).then(async msg => {
                    await msg.react("<a:upvote:767586020027531314>")
                    await msg.react("<a:downvote:767586020010754078>")
                })

            } else {

                let options = optionsOption?.split(" | ");

                if (options.length > 9) return interaction.followUp("You can't have more than 9 options!")

                result = options.map((c, i) => {
                    return `${num[i + 1]} ➜ ${c}`
                })
                const embedpoll2 = new MessageEmbed()
                    .setAuthor({
                        name: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTitle(`${question1}`)
                    .setDescription(`React with one of the following to determine your choice!\n\n${result.join('\n')}`)
                    .setColor('AQUA')
                    .setTimestamp()

                let msg = await interaction.followUp({
                    embeds: [embedpoll2]
                })

                options.map(async (c, x) => {
                    await msg.react(num[x + 1])
                })
            }

        } catch (e) {

            console.log(e)
            const errorEmbed = new MessageEmbed()
                .setTitle('Error')
                .setColor('RED')
                .setDescription(`Wrong usage!\n> Example: \`${process.env.PREFIX}poll "Do you like cookies?"\` or \`${process.env.PREFIX}poll "Do you like dogs or cats?" Dogs | Cats\``)
                .setTimestamp()
            return interaction.followUp({
                embeds: [errorEmbed]
            })
        }

    }
}