const db = require('../models/afk');
const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js');
const client = require('../index')

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    db.findOne({
        Guild: message?.guild?.id,
        Member: message?.author?.id
    }, async (err, data) => {
        if (err) throw err;
        if (data) {
            await data.delete()
            const afk = new MessageEmbed()
                .setTitle('Afk Removed')
                .setColor('GREEN')
                .setDescription(`Your AFK has been removed \n${data.Content} - <t:${data.TimeAgo}:R>`)
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()

            message.channel.send({
                embeds: [afk]
            })

        } else return;
    })

    if (message.mentions.members.first()) {
        db.findOne({
            Guild: message.guild.id,
            Member: message.mentions.members.first().id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const member = message.guild.members.cache.get(data.Member);
                const afk = new MessageEmbed()
                    .setTitle(`${member.user.tag} is AFK 💤`)
                    .setColor('RED')
                    .setDescription(`**Reason:** ${data.Content} - <t:${data.TimeAgo}:R>`)
                    .setFooter({
                        text: message.author.tag,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTimestamp()

                message.channel.send({
                    embeds: [afk]
                })
            } else return;
        })
    }
})