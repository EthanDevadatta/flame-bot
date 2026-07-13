const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');
const {
    owners
} = require('../../json/owners.json');
const {
    Permissions
} = require('discord.js');

module.exports = {
    name: "set",
    description: "Configration of Commands",
    options: [{
            name: 'banner',
            type: 'SUB_COMMAND',
            description: 'Set a banner for your profile',
            options: [{
                name: 'image-link',
                description: 'The link of the picture',
                type: 'STRING',
                required: false,
            }, ],
        },
        {
            name: 'birthday',
            type: 'SUB_COMMAND',
            description: 'Set your birthday for your profile',
            options: [{
                    name: 'date',
                    description: 'The date of your birthday Eg. 12',
                    type: 'INTEGER',
                    required: true,
                },
                {
                    name: 'month',
                    description: 'The month of your birthday Eg. 10',
                    type: 'INTEGER',
                    required: true,
                },
            ],
        },
        {
            name: 'chatbot',
            type: 'SUB_COMMAND',
            description: 'Set a channel for chat bot',
            options: [{
                name: 'channel',
                description: 'The channel for chat bot',
                type: 'CHANNEL',
                channelTypes: ['GUILD_TEXT'],
                required: true,
            }, ],
        },
        {
            name: 'bio',
            type: 'SUB_COMMAND',
            description: 'Set a bio for your profile',
            options: [{
                name: 'bio',
                description: 'Your Bio',
                type: 'STRING',
                required: false,
            }, ],
        },
        {
            name: 'color',
            type: 'SUB_COMMAND',
            description: 'Set the embed color for your profile',
            options: [{
                name: 'hex-code',
                description: 'The hex code',
                type: 'STRING',
                required: false,
            }, ],
        },
        {
            name: 'leveling',
            type: 'SUB_COMMAND',
            description: 'Enable or disable the leveling system',
            options: [{
                name: 'option',
                description: 'Enable or disable',
                required: true,
                type: 'STRING',
                choices: [{
                        name: 'enable',
                        value: 'enable',
                    },
                    {
                        name: 'disable',
                        value: 'disable',
                    }
                ]
            }]

        }, {
            name: 'auto-role',
            type: 'SUB_COMMAND',
            description: 'Automatically Give a role to a user when they join',
            options: [{
                name: 'role',
                description: 'The role to be assigned',
                required: true,
                type: 'ROLE',
            }, ]

        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const [SubCommand] = args;

        if (SubCommand === "banner") {
            const ProfileSchema = require('../../models/User Profile/banner');
            const getBanner = interaction.options.getString('image-link');

            ProfileSchema.findOne({
                User: interaction.user.id
            }, async (err, data) => {
                let newBg = getBanner
                if (!newBg) {
                    if (data) {
                        const d = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
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
                        interaction.followUp({
                            embeds: [d]
                        })
                    } else {
                        interaction.followUp(process.env.FAILURE_EMOJI + 'Give banner to set')
                    }
                } else {

                    if (getBanner.includes(".jpg") ||
                        getBanner.includes(".png") ||
                        getBanner.includes(".jpeg") ||
                        getBanner.includes(".gif") ||
                        getBanner.includes(".webp")
                    ) {
                        if (!data) {
                            new ProfileSchema({
                                User: interaction.user.id,
                                Banner: newBg
                            }).save();
                            const e = new MessageEmbed()
                                .setAuthor({
                                    name: interaction.user.tag,
                                    iconURL: interaction.user.displayAvatarURL({
                                        dynamic: true
                                    })
                                })
                                .setTitle(`Profile Updated`)
                                .setDescription(`Your profile banner has been updated! ${process.env.SUCCESS_EMOJI}`)
                                .setColor(`RED`)
                                .setTimestamp()
                                .setFooter({
                                    text: process.env.BOT_NAME,
                                    iconURL: process.env.BOT_ICON
                                })
                                .addField("➜ **New Banner**", "The image below is your new banner", true)
                                .setImage(newBg)
                            interaction.followUp({
                                embeds: [e]
                            })
                        } else {
                            data.Banner = newBg
                            data.save()
                            const f = new MessageEmbed()
                                .setAuthor({
                                    name: interaction.user.tag,
                                    iconURL: interaction.user.displayAvatarURL({
                                        dynamic: true
                                    })
                                })
                                .setTitle(`Profile Updated`)
                                .setDescription(`Your profile banner has been updated! ${process.env.SUCCESS_EMOJI}`)
                                .setColor(`RED`)
                                .setTimestamp()
                                .setFooter({
                                    text: process.env.BOT_NAME,
                                    iconURL: process.env.BOT_ICON
                                })
                                .addField("➜ **New Banner**", "The image below is your new banner", true)
                                .setImage(newBg)
                            interaction.followUp({
                                embeds: [f]
                            })
                        }
                    } else {
                        return interaction.followUp('That url isnt a valid image url')
                    }

                }
            })
        } else if (SubCommand === "birthday") {
            const Schema = require('../../models/User Profile/birthday');
            const day = interaction.options.getInteger('date');
            const month = interaction.options.getInteger('month');
            const months = {
                1: "January",
                2: "February",
                3: "March",
                4: "April",
                5: "May",
                6: "June",
                7: "July",
                8: "August",
                9: "September",
                10: "October",
                11: "November",
                12: "December"
            }

            if (!day || day > 31) return interaction.followUp(process.env.FAILURE_EMOJI + "Wrong Date Format, there are only 30 or 31 days in a month")
            if (!month || month > 12) return interaction.followUp(process.env.FAILURE_EMOJI + "Wrong Month Format, there are only 12 months in a year")

            const convertedDay = suffixes(day)
            const convertedMonth = months[month]
            const birthdayString = `${convertedDay} of ${convertedMonth}`
            Schema.findOne({
                User: interaction.user.id
            }, async (err, data) => {
                if (data) {
                    data.delete()

                    new Schema({
                        User: interaction.user.id,
                        Birthday: birthdayString
                    }).save()
                    interaction.followUp(`${process.env.SUCCESS_EMOJI} Saved as ${convertedDay} of ${convertedMonth}`)

                }
            })

        } else if (SubCommand === "chatbot") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !owners?.includes(interaction.user?.id))
                return interaction.followUp({
                    content: `${process.env.FAILURE_EMOJI} You need \`ADMINISTRATOR\` permission to run this command`,
                    ephemeral: true
                })
            const channell = interaction.options.getChannel('channel');
            const Schema = require('../../models/chatbot');
            Schema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (data) data.delete()
                new Schema({
                    guild: interaction.guild.id,
                    channel: channell.id,
                }).save();
                interaction.followUp(`I have set ${channell} for chat bot!`)
            })
        } else if (SubCommand === "bio") {
            const Schema = require('../../models/User Profile/bio');

            Schema.findOne({
                User: interaction.user.id
            }, async (err, data) => {
                let newInfo = interaction.options.getString('bio');

                if (!newInfo) {
                    if (data) {
                        const d = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Update Failed`)
                            .setDescription(`Your bio could not be set since you did not give a new bio ${process.env.SUCCESS_EMOJI}`)
                            .setColor(`RED`)
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **Current Bio**", data.Bio, true)
                        interaction.followUp({
                            embeds: [d]
                        })
                    } else {
                        interaction.followUp(process.env.FAILURE_EMOJI + 'Give Bio to set')
                    }
                } else {
                    if (newInfo.length > 165) return interaction.followUp(`**Max \`165\` Characters Allowed!**`);
                    let NewBio = chunk(newInfo, 42).join('\n');
                    if (!data) {
                        new Schema({
                            User: interaction.user.id,
                            Bio: NewBio
                        }).save();
                        const e = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Updated`)
                            .setDescription(`Your profile bio has been updated! ${process.env.SUCCESS_EMOJI}`)
                            .setColor(`RED`)
                            .setTimestamp()
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **New Bio**", NewBio, true)
                        interaction.followUp({
                            embeds: [e]
                        })
                    } else {
                        data.Bio = NewBio
                        data.save()
                        const f = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Updated`)
                            .setDescription(`Your profile bio has been updated! ${process.env.SUCCESS_EMOJI}`)
                            .setColor(`GREEN`)
                            .setTimestamp()
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **New bio**", NewBio, true)
                        interaction.followUp({
                            embeds: [f]
                        })
                    }
                }
            })

        } else if (SubCommand === "color") {
            const Schema = require('../../models/User Profile/color');

            Schema.findOne({
                User: interaction.user.id
            }, async (err, data) => {
                let color = interaction.options.getString('hex-code');

                if (!color) {
                    if (data) {
                        const d = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Update Failed`)
                            .setDescription(`Your color could not be set since you did not give a new color ${process.env.FAILURE_EMOJI}`)
                            .setColor(`RED`)
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **Current Color**", data.Color, true)
                        interaction.followUp({
                            embeds: [d]
                        })
                    } else {
                        interaction.followUp(process.env.FAILURE_EMOJI + 'Give Hex Color to set')
                    }
                } else {
                    if (!color.includes("#")) return interaction.followUp(process.env.FAILURE_EMOJI + " It must be a Hex Color, Check out [this](https://g.co/kgs/DcnGMb)")
                    if (color.length > 10) return interaction.followUp(process.env.FAILURE_EMOJI + `Max \`10\` Characters Allowed!`);
                    let NewColor = chunk(color, 42).join('\n');
                    if (!data) {
                        new Schema({
                            User: interaction.user.id,
                            Color: NewColor
                        }).save();
                        const e = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Updated`)
                            .setDescription(`Your profile color has been updated! ${process.env.SUCCESS_EMOJI}`)
                            .setColor(NewColor)
                            .setTimestamp()
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **New Color**", NewColor, true)
                        interaction.followUp({
                            embeds: [e]
                        })
                    } else {
                        data.Color = NewColor
                        data.save()
                        const f = new MessageEmbed()
                            .setAuthor({
                                name: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({
                                    dynamic: true
                                })
                            })
                            .setTitle(`Profile Updated`)
                            .setDescription(`Your profile color has been updated! ${process.env.SUCCESS_EMOJI}`)
                            .setColor(NewColor)
                            .setTimestamp()
                            .setFooter({
                                text: process.env.BOT_NAME,
                                iconURL: process.env.BOT_ICON
                            })
                            .addField("➜ **New Color**", NewColor, true)
                        interaction.followUp({
                            embeds: [f]
                        })
                    }
                }
            })
        } else if (SubCommand === "leveling") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !owners?.includes(interaction.user?.id))
                return interaction.followUp({
                    content: `${process.env.FAILURE_EMOJI} You need \`ADMINISTRATOR\` permission to run this command`,
                    ephemeral: true
                })
            const choice = interaction.options.getString('option');

            if (choice === "enable") {
                const schema = require("../../models/level");
                schema.findOne({
                    Guild: interaction.guild.id
                }, async (err, data) => {
                    if (!data) {
                        new schema({
                            Guild: interaction.guild.id,
                        }).save();
                        interaction.followUp({
                            content: `${process.env.SUCCESS_EMOJI} Enabled Leveling System`,
                        });
                    } else if (data) {
                        interaction.followUp({
                            content: `${process.env.FAILURE_EMOJI} Leveling System is enabled already`,
                        });
                    }
                });
            } else if (choice === "disable") {
                const schema = require('../../models/level');
                schema.findOne({
                    Guild: interaction.guild.id
                }, async (err, data) => {
                    if (data) {
                        await data.delete()
                        interaction.followUp({
                            content: `${process.env.SUCCESS_EMOJI} Disabled Leveling System in this server`,
                        })
                    } else if (!data) {
                        interaction.followUp({
                            content: `${process.env.FAILURE_EMOJI} Leveling System is already disabled`,
                        })
                    }
                })
            }

        } else if (SubCommand === "auto-role") {
            const schema = require('../../models/Auto Role');
            const role = interaction.options.getRole('role');

            schema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err
                if (data) {
                    const RoleView = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Auto Join/Join Role Already set as <@&${data.role}>...\n\n Do you want to delete this?`)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setTimestamp()

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setStyle('SUCCESS')
                            .setLabel('Yes')
                            .setCustomId('autorole-delete-yes')
                        )
                        .addComponents(
                            new MessageButton()
                            .setStyle('DANGER')
                            .setLabel('No')
                            .setCustomId('autorole-delete-no')
                        )
                    interaction.followUp({
                        embeds: [RoleView],
                        components: [row]
                    })
                    const collector = await interaction.channel.createMessageComponentCollector({
                        time: 15000,
                        componentType: "BUTTON",
                    })

                    collector.on("collect", async (i) => {
                        i.deferUpdate()
                        if (i.customId === "autorole-delete-yes") {
                            if (i.user.id !== interaction.user.id) return i.reply({
                                content: "Don't touch other people's button",
                                ephemeral: true
                            })

                            i.deferUpdate()

                            data.delete()
                            interaction.channel.send({
                                content: "Auto Role has been deleted!"
                            })
                        } else if (i.customId === "autorole-delete-yes") {
                            if (i.user.id !== interaction.user.id) return i.reply({
                                content: "Don't touch other people's button",
                                ephemeral: true
                            })

                            i.deferUpdate()
                            interaction.channel.send({
                                content: 'Cancelled'
                            })
                        }
                    })
                } else {
                    data = new schema({
                        guild: interaction.guild.id,
                        role: role.id
                    })
                    await data.save();
                    const setembed = new MessageEmbed()
                        .setColor('RED')
                        .setDescription(`Auto Join/Join Role has been set as <@&${role.id}>`)
                    interaction.followUp({
                        embeds: [setembed]
                    })
                }
            })

        }
    }
};
/**
 * @param {Number} number
 */
function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}st` : lastChar == "2" ?
        `${converted}nd` : lastChar == '3' ?
        `${converted}rd` : `${converted}th`
}

function chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
}