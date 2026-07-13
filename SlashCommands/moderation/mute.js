const {
    MessageEmbed,
    Collection,
    DataResolver,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const ms = require("ms")
const db = require("../../models/mute")

module.exports = {
    name: 'mute',
    description: `Mutes a user`,
    userPermissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_ROLES"],
    options: [{
            name: 'target',
            description: 'Member to Mute',
            type: 'USER',
            required: true,
        },
        {
            name: 'time',
            description: 'Duration to Mute Eg 10s, 1hr, 2d',
            type: 'STRING',
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for muting',
            type: 'STRING',
            required: false,
        }
    ],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        var user = interaction.options.getMember('target');
        const time = interaction.options.getString('time');
        let reason = interaction.options.getString('reason') || "No Reason Provided";
        const role = interaction.guild.roles.cache.find(role => role.name === 'Muted')

        let erm = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + " This user isn't in this guild!").setColor(`RED`)
        if (!user) return interaction.followUp({
            embeds: [erm]
        })

        const failed = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + ` You can't Mute this member because their role is higher than yours!`).setColor("RED")

        if (user.roles.highest.position >= interaction.guild.me.roles.highest.position ||
            user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.followUp({
                embeds: [failed]
            })

        const selfmute = new MessageEmbed()
            .setDescription(process.env.FAILURE_EMOJI + " You can't mute your self")
            .setColor("RED")
        if (user.id === interaction.user.id) return interaction.followUp({
            embeds: [selfmute]
        });

        const botmute = new MessageEmbed()
            .setDescription(process.env.FAILURE_EMOJI + " You cant mute me").setColor('RED')
        if (user.id === client.user.id) return interaction.followUp({
            embeds: [botmute]
        });
        if (ms(time) === undefined) {

            const embed = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + ` I couldn't find out the duration of this mute!`).setColor("RED")
            return interaction.followUp({
                embeds: [embed]
            })

        }

        if (!role) {
            try {
                const norole = new MessageEmbed()
                    .setDescription('Muted role is not found, attempting to create `Muted` role')
                    .setColor('RED')
                interaction.followUp({
                    embeds: [norole]
                });

                let muterole = await interaction.guild.roles.create({

                    name: 'Muted',
                    permissions: []

                });
                interaction.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                const muterolecreate = new MessageEmbed()
                    .setDescription('Successfully created `Muted` Role')
                    .setColor('GREEN')
                interaction.followUp({
                    embeds: [muterolecreate]
                })
            } catch (error) {
                interaction.followUp({
                    content: 'Couldnt create `Muted` Role'
                })
            }
        } else {

            if (user.roles.cache.some(role => role.name == 'Muted')) {

                const embed = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + ` This user is already muted!`).setColor("RED")
                return interaction.followUp({
                    embeds: [embed]
                })

            }

            const data = new db({
                guildid: interaction.guild.id,
                user: user.user.id,
                roles: [user.roles.cache.filter(e => e.id !== interaction.guild.id).map(role => role.id)],
                reason: reason
            })
            data.save()

            user.roles.set([role.id])

            let mue = new MessageEmbed()
                .setDescription(`${user.user} has been Muted for ${ms(ms(time, { long: true }))} with **Reason:** *${reason}*`)
                .setColor('GREEN')
            let msg = await interaction.followUp({
                embeds: [mue]
            })

            var duration = ms(time)

            let mm = new MessageEmbed()
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTitle(`You've been Muted in ${interaction.guild.name}`)
                .setColor(`RED`)
                .setTimestamp()
                .addField("Duration", `${ms(duration, { long: true })}`, true)
                .addField("Reason", `${reason}`, false)
            user.send({
                embeds: [mm]
            }).catch(e => {
                return
            })

            setTimeout(async () => {

                const findmember = interaction.guild.members.cache.get(`${user.user.id}`)

                if (findmember) {

                    db.findOne({
                        guildid: interaction.guild.id,
                        user: user.user.id
                    }, async (err, data) => {
                        if (err) throw err;
                        if (data) {

                            data.roles.map((w, i) => user.roles.set(w))
                            await db.findOneAndDelete({
                                user: user.user.id,
                                guildid: interaction.guild.id
                            })

                        }
                    })

                } else if (!findmember) {
                    return
                }
            }, ms(time))
        }
    }
}