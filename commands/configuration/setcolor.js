const {
    MessageEmbed
} = require('discord.js');
const Schema = require('../../models/User Profile/color');

module.exports = {
    name: 'set-color',
    aliases: ['setcolor'],
    description: 'Set color for your profile',
    usage: '<hex color code>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        Schema.findOne({
            User: message.author.id
        }, async (err, data) => {
            let color = args.join(' ');
            if (!color.includes("#")) return message.reply(process.env.FAILURE_EMOJI + "It must be a Hex Color, Check out https://g.co/kgs/DcnGMb")
            if (color.length > 10) return message.reply(process.env.FAILURE_EMOJI + `Max \`10\` Characters Allowed!`);
            let NewColor = chunk(color, 42).join('\n');
            if (!color) {
                if (data) {
                    const d = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Update Failed`)
                        .setDescription(`Your color could not be set since you did not give a new color ${process.env.FAILURE_EMOJI}`)
                        .setColor(`RED`)
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **Current Color**", data.Color, true)
                    message.reply({
                        embeds: [d]
                    })
                } else {
                    message.reply(process.env.FAILURE_EMOJI + 'Give Hex Color to set')
                }
            } else {
                if (!data) {
                    new Schema({
                        User: message.author.id,
                        Color: NewColor
                    }).save();
                    const e = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile color has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(NewColor)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New Color**", NewColor, true)
                    message.reply({
                        embeds: [e]
                    })
                } else {
                    data.Color = NewColor
                    data.save()
                    const f = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile color has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(NewColor)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New Color**", NewColor, true)
                    message.reply({
                        embeds: [f]
                    })
                }
            }
        })
    }
}

function chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
}