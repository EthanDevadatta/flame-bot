const thanksSchema = require('../../models/thank')
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'thank',
    description: "Thank a User :)",
    options: [{
        name: 'target',
        type: 'USER',
        description: 'User you want to thank',
        required: true,
    }, ],
    run: async (client, interaction, args) => {
        const target = interaction.options.getUser('target');
        if (!target) {
            interaction.followUp('Please specify someone to thank')
            return
        }

        const {
            guild
        } = interaction
        const guildId = guild.id
        const targetId = target.id
        const authorId = interaction.user.id
        const now = new Date()

        if (targetId === authorId) {
            interaction.followUp('You cannot thank yourself')
            return
        }

        const authorData = await thanksSchema.findOne({
            userId: authorId,
            guildId,
        })

        if (authorData && authorData.lastGave) {
            const then = new Date(authorData.lastGave)

            const diff = now.getTime() - then.getTime()
            const diffHours = Math.round(diff / (1000 * 60 * 60))

            const hours = 24
            if (diffHours <= hours) {
                interaction.followUp(
                    `You have already thanked someone within the last ${hours} hours.`
                )
                return
            }
        }

        await thanksSchema.findOneAndUpdate({
            userId: authorId,
            guildId,
        }, {
            userId: authorId,
            guildId,
            lastGave: now,
        }, {
            upsert: true,
        })

        const result = await thanksSchema.findOneAndUpdate({
            userId: targetId,
            guildId,
        }, {
            userId: targetId,
            guildId,
            $inc: {
                received: 1,
            },
        }, {
            upsert: true,
            new: true,
        })
        const amount = result.received
        const embed = new MessageEmbed()
            .setDescription(`> You have thanked <@${targetId}>. They now have ${amount} thank(s)! :) Doesn't it feel nice to say thanks!?`)
            .setColor('RED')
        interaction.followUp({
            embeds: [embed]
        })
    }
}
