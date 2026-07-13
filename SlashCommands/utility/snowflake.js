const {
    MessageEmbed
} = require('discord.js');
const humanize = require('humanize-duration')
const SU = require('discord.js').SnowflakeUtil
module.exports = {
    name: 'snowflake',
    description: 'Shows diffrence between 2 messages',
    options: [{
        name: 'message-id-1',
        type: 'STRING',
        description: 'First Message ID',
        required: true,
    }, {
        name: 'message-id-2',
        type: 'STRING',
        description: 'Second Message ID',
        required: true,
    }, ],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {

        // if (!args[0]) return interaction.followUo(process.env.FAILURE_EMOJI + ' Please give me the id of the first message!')
        // if (isNaN(args[0])) return interaction.followUo(process.env.FAILURE_EMOJI + ' Please give me a number only!!`')

        // if (!args[1]) return interaction.followUo(process.env.FAILURE_EMOJI + ' Please give me the id of the second message!')
        // if (isNaN(args[1])) return interaction.followUo(process.env.FAILURE_EMOJI + ' Please give me a number only!!`')

        const id1 = interaction.options.getString('message-id-1');
        if (isNaN(id1)) return interaction.followUp(process.env.FAILURE_EMOJI + ' Please give me a number only!!')
        const id2 = interaction.options.getString('message-id-2');
        if (isNaN(id2)) return interaction.followUp(process.env.FAILURE_EMOJI + ' Please give me a number only!!')
        let firstMessage = SU.deconstruct(id1)
        let secondMessage = SU.deconstruct(id2)

        let diffInMs = firstMessage.timestamp - secondMessage.timestamp

        return interaction.followUp(`The difference between these two messages is **${humanize(diffInMs)}**`)
    }
}