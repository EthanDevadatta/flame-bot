const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
    MessageSelectMenu
} = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Get the avatar of a user",
    options: [{
        name: 'user',
        type: 'USER',
        description: 'The user to get the avatar',
        required: false,
    }, ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser("user") || interaction.user;

        if (user.displayAvatarURL({
                dynamic: true
            }).includes(".gif")) {
            const lb = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId("uav")
                    .setPlaceholder("Choose A Format")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([{
                        label: 'Gif',
                        description: `${user.username}'s Avatar in GIF Format`,
                        value: 'avgif',
                    }, {
                        label: 'Webp',
                        description: `${user.username}'s Avatar in WEBP Format`,
                        value: 'avwebp',
                    }, ])
                )
            const embed = new MessageEmbed()
                .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({ format: 'webp' })}) • [GIF](${user.displayAvatarURL({ format: 'gif' })})`)
                .setAuthor({
                    name: `${process.env.BOT_NAME}`,
                    iconURL: process.env.BOT_ICON
                })
                .setTitle(`${user.username}'s Avatar Preview`)
                .setURL('https://discord.gg/FCP2HWksBU')
                .setColor('RED')
                .setFooter({
                    text: 'Format: .gif'
                })
                .setImage(user.displayAvatarURL({
                    dynamic: true,
                    size: 2048
                }))
            const msg = interaction.followUp({
                embeds: [embed],
                components: [lb]
            })
            const collector = await interaction.channel.createMessageComponentCollector({
                time: 30000,
                componentType: "SELECT_MENU",
            })

            collector.on("collect", async (i) => {

                if (i.customId === 'uav') {
                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "Please dont use others peoples drowp down menu!",
                        ephemeral: true
                    })

                    const gg = i.values[0]
                    if (gg === 'avgif') {
                        i.deferUpdate()
                        const embedg = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({ format: 'webp' })}) • [GIF](${user.displayAvatarURL({ format: 'gif' })})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .gif'
                            })
                            .setImage(user.displayAvatarURL({
                                dynamic: true,
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embedg]
                        })
                    } else if (gg === 'avwebp') {
                        i.deferUpdate()
                        const embedf = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({ format: 'webp' })}) • [GIF](${user.displayAvatarURL({ format: 'gif' })})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .webp'
                            })
                            .setImage(user.displayAvatarURL({
                                format: 'webp',
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embedf]
                        })
                    }
                }
            })


        } else {
            const lb = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId("uav1")
                    .setPlaceholder("Choose A Format")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([{
                            label: 'Png',
                            description: `${user.username}'s Avatar in PNG Format`,
                            value: 'png',
                        }, {
                            label: 'Jpg',
                            description: `${user.username}'s Avatar in JPG Format`,
                            value: 'avjpg',
                        },
                        {
                            label: 'Jpeg',
                            description: `${user.username}'s Avatar in JPEG Format`,
                            value: 'avjpeg',
                        },
                        {
                            label: 'Webp',
                            description: `${user.username}'s Avatar in WEBP Format`,
                            value: 'avwebp2',
                        },
                    ])
                )
            const embed = new MessageEmbed()
                .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`)
                .setAuthor({
                    name: `${process.env.BOT_NAME}`,
                    iconURL: process.env.BOT_ICON
                })
                .setTitle(`${user.username}'s Avatar Preview`)
                .setURL('https://discord.gg/FCP2HWksBU')
                .setColor('RED')
                .setFooter({
                    text: 'Format: .png'
                })
                .setImage(user.displayAvatarURL({
                    format: 'png',
                    size: 2048
                }))
            const msg = interaction.followUp({
                embeds: [embed],
                components: [lb]
            })
            const collector = await interaction.channel.createMessageComponentCollector({
                time: 30000,
                componentType: "SELECT_MENU",
            })

            collector.on("collect", async (i) => {

                if (i.customId === 'uav1') {
                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "Please dont use others peoples drowp down menu!",
                        ephemeral: true
                    })

                    const gg = i.values[0]
                    if (gg === 'png') {
                        i.deferUpdate()
                        const embedg = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .png'
                            })
                            .setImage(user.displayAvatarURL({
                                format: 'png',
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embedg]
                        })
                    } else if (gg === 'avjpg') {
                        i.deferUpdate()
                        const embedf = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .jpg'
                            })
                            .setImage(user.displayAvatarURL({
                                format: 'jpg',
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embedf]
                        })
                    } else if (gg === "avjpeg") {
                        i.deferUpdate()
                        const embedb = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .jpeg'
                            })
                            .setImage(user.displayAvatarURL({
                                format: 'jpeg',
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embedb]
                        })
                    } else if (gg === "avwebp2") {
                        i.deferUpdate()
                        const embede = new MessageEmbed()
                            .setDescription(`Download Links: [WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`)
                            .setAuthor({
                                name: `${process.env.BOT_NAME}`,
                                iconURL: process.env.BOT_ICON
                            })
                            .setTitle(`${user.username}'s Avatar Preview`)
                            .setURL('https://discord.gg/FCP2HWksBU')
                            .setColor('RED')
                            .setFooter({
                                text: 'Format: .webp'
                            })
                            .setImage(user.displayAvatarURL({
                                format: 'webp',
                                size: 2048
                            }))
                        interaction.editReply({
                            embeds: [embede]
                        })
                    }
                }
            })

        }

    }
}