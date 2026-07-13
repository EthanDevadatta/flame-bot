const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const ProfileSchema = require('../../models/User Profile/banner');

module.exports = {
    name: 'set-banner',
    aliases: ['setbanner'],
    description: 'Set a banner for your profile',
    usage: '<attachment>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        ProfileSchema.findOne({
            User: message.author.id
        }, async (err, data) => {
            let newBg = message.attachments.first()
            if (!newBg) {
                if (data) {
                    const d = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Update Failed`)
                        .setDescription(`Your banner could not be set since you did not send a new banner ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`RED`)
                        .setFooter({
                            text: process.env.BOT_NAME,
                            iconURL: process.env.BOT_ICON
                        })
                        .addField("➜ **Current Banner**", "The image below is your current banner", true)
                        .setImage(data.Banner)
                    message.reply({
                        embeds: [d]
                    })
                } else {
                    message.reply(process.env.FAILURE_EMOJI + 'Give banner to set')
                }
            } else {
                if (!data) {
                    new ProfileSchema({
                        User: message.author.id,
                        Banner: newBg.url
                    }).save();
                    const e = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile banner has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`RED`)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New Banner**", "The image below is your new banner", true)
                        .setImage(newBg.url)
                    message.reply({
                        embeds: [e]
                    })
                } else {
                    data.Banner = newBg.url
                    data.save()
                    const f = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile banner has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`RED`)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New Banner**", "The image below is your new banner", true)
                        .setImage(newBg.url)
                    message.reply({
                        embeds: [f]
                    })
                }
            }
        })
    }
}