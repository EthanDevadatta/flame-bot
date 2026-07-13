const {
    MessageEmbed
} = require('discord.js');
const Schema = require('../../models/User Profile/bio');

module.exports = {
    name: 'set-bio',
    aliases: ['setbio'],
    description: 'Set a bio for your profile',
    usage: '<bio>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
         Schema.findOne({
            User: message.author.id
        }, async (err, data) => {
            let newInfo = args.join(' ');
            if (newInfo.length > 165) return message.reply(`**Max \`165\` Characters Allowed!**`);
            let NewBio = chunk(newInfo, 42).join('\n');
            if (!NewBio) {
                if (data) {
                    const d = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Update Failed`)
                        .setDescription(`Your bio could not be set since you did not give a new bio ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`RED`)
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **Current Bio**", data.Bio, true)
                    message.reply({
                        embeds: [d]
                    })
                } else {
                    message.reply(process.env.FAILURE_EMOJI + 'Give Bio to set')
                }
            } else {
                if (!data) {
                    new Schema({
                        User: message.author.id,
                        Bio: NewBio
                    }).save();
                    const e = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile bio has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`RED`)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New Bio**", NewBio, true)
                    message.reply({
                        embeds: [e]
                    })
                } else {
                    data.Bio = NewBio
                    data.save()
                    const f = new MessageEmbed()
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL()
                        })
                        .setTitle(`Profile Updated`)
                        .setDescription(`Your profile bio has been updated! ${process.env.SUCCESS_EMOJI}`)
                        .setColor(`GREEN`)
                        .setTimestamp()
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        .addField("➜ **New bio**", NewBio, true)
                    message.reply({
                        embeds: [f]
                    })
                }
            }
        })
    }
};

function chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
}