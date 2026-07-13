const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const Schema = require('../../models/chatbot')

module.exports = {
    name: 'set-chatbot',
    description: 'Set a channel for chat bot',
    usage: '<channel>',
    run: async (client, message, args, Discord) => {
        const channell = message.mentions.channels.first()
        if (!channell) return message.reply('Please mention a channel!');

        Schema.findOne({
            guild: message.guild.id
        }, async (err, data) => {
            if (data) data.delete()
            new Schema({
                guild: message.guild.id,
                channel: channell.id,
            }).save();
            message.reply(`I have sent ${channell} for chat bot!`)
        })
    }
}