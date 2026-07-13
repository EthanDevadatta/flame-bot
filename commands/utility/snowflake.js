const {
    MessageEmbed
} = require('discord.js');
const humanize = require('humanize-duration')
const SU = require('discord.js').SnowflakeUtil
module.exports = {
    name: 'snowflake',
    description: 'Shows diffrence between 2 messages',
    aliases: ['timedif', 'timediff', 'timediffrence'],
    usage: '<first message id> <second message id>',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        
        if (!args[0]) return message.reply(process.env.FAILURE_EMOJI + ' Please give me the id of the first message!')
        if (isNaN(args[0])) return message.reply(process.env.FAILURE_EMOJI + ' Please give me a number only!!`')

        if (!args[1]) return message.reply(process.env.FAILURE_EMOJI + ' Please give me the id of the second message!')
        if (isNaN(args[1])) return message.reply(process.env.FAILURE_EMOJI + ' Please give me a number only!!`')

        let firstMessage = SU.deconstruct(args[0])
        let secondMessage = SU.deconstruct(args[1])

        let diffInMs = firstMessage.timestamp - secondMessage.timestamp

        return message.reply(`The difference between these two messages is **${humanize(diffInMs)}**`)
    }
}