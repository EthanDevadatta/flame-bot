const {
    inspect
} = require("util");
const premiumSchema = require('../../models/premium');
const db = require('../../models/keys');
const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'add-premium',
    ownerOnly: true,
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply("Please mention a valid member")
        premiumSchema.findOne({
            User: member.id,
        }, async (err, data) => {
            if (data) return message.reply("This user already has premium features")

            function generatePassword() {
                var length = 9,
                    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                    retVal = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                return retVal;
            }
            let key = generatePassword();
            db.findOne({
                client: client.user.id
            }, async (err, data) => {
                if (!data) {
                    data = new db({
                        client: client.user.id,
                        keys: [key]
                    }).save()
                    const dmembed = new MessageEmbed()
                        .setAuthor({
                            name: member.user.tag,
                            iconURL: member.user.displayAvatarURL({dynamic: true})
                        })
                        .setTitle('Thanks for buying premium!')
                        .setTimestamp()
                        .setColor('GOLD')
                        .setDescription(`You have been given ${process.env.BOT_NAME} Premium!\n Here is your premium key: ||\`${key}\`||`)
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                    member.send({
                        embeds: [dmembed]
                    })

                } else {
                    data.keys.push(key);
                    data.save();
                    const dmembed2 = new MessageEmbed()
                       .setAuthor({
                           name: member.user.tag,
                           iconURL: member.user.displayAvatarURL({dynamic: true})
                       })
                        .setTitle('Thanks for buying premium!')
                        .setTimestamp()
                        .setColor('GOLD')
                        .setDescription(`You have been given ${process.env.BOT_NAME} Premium Key!\nYou can gift it or redeem it for yourself\n Here is your premium key: ||\`${key}\`||`)
                        .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                    member.send({
                        embeds: [dmembed2]
                    })
                }
                message.channel.send(`${process.env.SUCCESS_EMOJI} I have generated a premium key and sent to that user!`)
                const timestp = Math.floor(Date.now() / 1000);
                const logchannel = client.channels.cache.get('907510489544810546')
                const logembed = new MessageEmbed()
                    .setTitle('Key Created')
                    .setDescription(`Time Created: <t:${timestp}:F>`)
                    .addField('Created by:', `> ${message.author.tag} \`${message.author.id}\``)
                    .addField('Created for:', `> ${member.user.tag} \`${member.user.id}\``)
                    .addField('In Guild:', `> ${message.guild.name} \`${message.guild.id}\``)
                    .addField('Key:', `> ||\`${key}\`||`)
                    .setColor('GOLD')
                    .setTimestamp()
                    .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})

                logchannel.send({
                    embeds: [logembed]
                })
            })

        })
    }
}