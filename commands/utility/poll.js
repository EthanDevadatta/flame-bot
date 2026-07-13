async function reactEmojies(message, emojies) {
    for (const emoji of emojies) {
        await message.react(emoji);
    }
}

const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Makes a poll',
    usage: '"<poll question>" [option1] | [option2] | [option3]',
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send('Please Specify a question!')
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
            }
            var questionRe = /"(.*)"/gmi
            let question = args.join(" ").match(questionRe)

            if (!questionRe) return message.reply("You did not provide question")
            let options = args.join(" ").slice(question[0].length).split(" | ")
            let result = ""

            if (options.length <= 1) {
                result += "<a:upvote:767586020027531314> ➜ Yes\n"
                result += "<a:downvote:767586020010754078> ➜ No"

                const embedpoll = new Discord.MessageEmbed()
                    .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL()
                    })
                    .setTitle(question.join(' '))
                    .setDescription(`React with one of the following to determine your choice!\n\n${result}`)
                    .setColor('AQUA')
                    .setTimestamp()

                return message.channel.send({
                    embeds: [embedpoll]
                }).then(async msg => {
                    await msg.react("<a:upvote:767586020027531314>")
                    await msg.react("<a:downvote:767586020010754078>")
                })

            } else {
                if (options.length > 9) return message.error("Cannot be more than 9 options")
                result = options.map((c, i) => {
                    return `${num[i + 1]} ➜ ${c}`
                })
                const embedpoll2 = new Discord.MessageEmbed()
                    .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL()
                    })
                    .setTitle(question.join(' '))
                    .setDescription(`React with one of the following to determine your choice!\n\n${result.join('\n')}`)
                    .setColor('AQUA')
                    .setTimestamp()

                let msg = await message.channel.send({
                    embeds: [embedpoll2]
                })
                options.map(async (c, x) => {
                    await msg.react(num[x + 1])
                })
            }
        } catch (e) {
            console.log(e)
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Error')
                .setColor('RED')
                .setDescription(`Wrong usage!\n> Example: \`${process.env.PREFIX}poll "Do you like cookies?"\` or \`${process.env.PREFIX}poll "Do you like dogs or cats?" Dogs | Cats\``)
                .setTimestamp()
            return message.reply({embeds: [errorEmbed]})
        }

    }
}