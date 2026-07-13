const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "Get info about a user",
    options: [{
        name: 'user',
        type: 'USER',
        description: 'The user you want to get information about',
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
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const userg = await client.users.fetch(user.id, {
            force: true
        })

        let isBot, isAnimated, Formats;
        if (user.displayAvatarURL({
                dynamic: true
            }).includes(".gif")) {
            Formats = `[WEBP](${user.displayAvatarURL({format: 'webp'})}) • [GIF](${user.displayAvatarURL({format: 'gif'})})`
        } else {
            Formats = `[WEBP](${user.displayAvatarURL({format: 'webp'})}) • [JPEG](${user.displayAvatarURL({format: 'jpeg'})}) • [JPG](${user.displayAvatarURL({format: 'jpg'})}) • [PNG](${user.displayAvatarURL({format: 'png'})})`
        }
        if (user.displayAvatarURL({
                dynamic: true
            }).includes(".gif")) {
            isAnimated = process.env.SUCCESS_EMOJI
        } else {
            isAnimated = process.env.FAILURE_EMOJI
        }
        if (user?.bot === true) {
            isBot = process.env.SUCCESS_EMOJI
        } else {
            isBot = process.env.FAILURE_EMOJI
        }

        const badgesArray = {
            HOUSE_BRAVERY: "<:hypesquad_bravery:814491294696341524> • House Bravery",
            HOUSE_BRILLIANCE: "<:hypesquad_brilliance:814491312124330004> • House Brilliance",
            HOUSE_BALANCE: "<:hypesquad_balance:814491283769786368> • House Balance",
            BUGHUNTER_LEVEL_1: "<:bug_hunter:814491292369289276> • Bug Hunter Level 1",
            BUGHUNTER_LEVEL_2: "<:bug_hunter_2:814491290145259560> • Bug Hunter Level 2",
            HYPESQUAD_EVENTS: "<:hypesquad_events:814491280171073576> • Hypesquad Events",
            EARLY_VERIFIED_DEVELOPER: "<:early_verified_bot_developer:814491299411263500> • Early Verified Developer",
            VERIFIED_DEVELOPER: "<:early_verified_bot_developer:814491299411263500> • Verified Developer",
            DISCORD_PARTNER: "<:partnered:814491300068851725> • Discord Partner",
            PARTNERED_SERVER_OWNER: "<:partnered_server_owner:814491286026977281> • Partnered Server Owner",
            EARLY_SUPPORTER: "<:EarlySupporter:879034495536340993> • Early Supporter",
            DISCORD_EMPLOYEE: "<:discord_staff:814491281832804416> • Discord Employee",
        };

        const badgecheck = user.flags?.toArray()
        const badges = `${badgecheck?.length ? `${badgecheck.map(flag => badgesArray[badgecheck]).join('\n')}` : ''}`

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Account')
                .setStyle('SUCCESS')
                .setDisabled(true)
                .setCustomId('user-acc')
            )
            .addComponents(
                new MessageButton()
                .setLabel('Guild')
                .setStyle('PRIMARY')
                .setCustomId('user-guild')
            )
            .addComponents(
                new MessageButton()
                .setLabel('Roles')
                .setStyle('PRIMARY')
                .setCustomId('user-roles')
            )
            .addComponents(
                new MessageButton()
                .setLabel('Permissions')
                .setStyle('PRIMARY')
                .setCustomId('user-perms')

            )


        const embedAcc = new MessageEmbed()
            .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setColor('BLUE')
.setImage(`${userg.bannerURL({dynamic: true, size: 2048}) || " "}`)
            .setDescription(`<@${user.id}> • ID: ${user.id}`)
            .setThumbnail(user.displayAvatarURL({
                dynamic: true
            }))
            .addField('Account Information',
                `• **ID:** ${user.id}
                 • **Username:** ${user.username}
                 • **Discriminator:** #${user.discriminator}
                 • **Registered:** <t:${Math.floor(user.createdTimestamp / 1000)}:F> [<t:${Math.floor(user.createdTimestamp / 1000)}:R>]
                 • **Is Bot?:** ${isBot}
               `
            )
            .addField('Profile Picture',
                `
                 • **Animated:** ${isAnimated}
                 • **Formats:** ${Formats}
                 • **Download** [Click Here](${user.displayAvatarURL({dynamic: true})})
                `)
            .addField('Badges',
                `
                ${badges}
                `)

        const msg = await interaction.followUp({
            embeds: [embedAcc],
            components: [row]
        })

        const collector = await msg.createMessageComponentCollector({
            time: 30000,
            componentType: "BUTTON",
        })

        collector.on("collect", async (i) => {
            if (i.user.id !== interaction.user.id) return i.reply({
                content: "Don't touch other people's button",
                ephemeral: true
            })
            switch (i.customId) {
                case "user-acc":

                    i.deferUpdate()

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Account')
                            .setStyle('SUCCESS')
                            .setDisabled(true)
                            .setCustomId('user-acc')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Guild')
                            .setStyle('PRIMARY')
                            .setCustomId('user-guild')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Roles')
                            .setStyle('PRIMARY')
                            .setCustomId('user-roles')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Permissions')
                            .setStyle('PRIMARY')
                            .setCustomId('user-perms')

                        )


                    const embedAcc = new MessageEmbed()
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setColor('BLUE')
                        .setImage(`${userg.bannerURL({dynamic: true, size: 2048}) || " "}`)
                        .setDescription(`<@${user.id}> • ID: ${user.id}`)
                        .setThumbnail(user.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField('Account Information',
                            `• **ID:** ${user.id}
                 • **Username:** ${user.username}
                 • **Discriminator:** #${user.discriminator}
                 • **Registered:** <t:${Math.floor(user.createdTimestamp / 1000)}:F> [<t:${Math.floor(user.createdTimestamp / 1000)}:R>]
                 • **Is Bot?:** ${isBot}
               `
                        )
                        .addField('Profile Picture',
                            `
                 • **Animated:** ${isAnimated}
                 • **Formats:** ${Formats}
                 • **Download** [Click Here](${user.displayAvatarURL({ dynamic: true })})
                `)
                        .addField('Badges',
                            `
                ${badges}
                `)

                    interaction.editReply({
                        embeds: [embedAcc],
                        components: [row]
                    })
                    break;


                case "user-guild":


                    i.deferUpdate()
                    let check;
                    if (member.premiumSinceTimestamp == null) {
                        check = "*Not Boosting this Server*"
                    } else {
                        check = `<t:${~~(member.premiumSinceTimestamp / 1000)}:R> `
                    }
                    const rowg = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Account')
                            .setStyle('PRIMARY')
                            .setCustomId('user-acc')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Guild')
                            .setStyle('SUCCESS')
                            .setDisabled(true)
                            .setCustomId('user-guild')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Roles')
                            .setStyle('PRIMARY')
                            .setCustomId('user-roles')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Permissions')
                            .setStyle('PRIMARY')
                            .setCustomId('user-perms')

                        )
                    let acknowments = "None";
                    if (
                        member.permissions.has("BAN_MEMBERS") ||
                        member.permissions.has("MANAGE_MESSAGES") ||
                        member.permissions.has("KICK_MEMBERS") ||
                        member.permissions.has("MANAGE_ROLES")
                    ) {
                        acknowments = "Moderator"
                    };
                    if (member.permissions.has("MANAGE_EVENTS")) {
                        acknowments = "Event Manager"
                    };
                    if (member.permissions.has("MANAGE_GUILD")) {
                        acknowments = "Server Manager"
                    };
                    if (member.permissions.has("ADMINISTRATOR")) {
                        acknowments = "Administrator"
                    };
                    if (user?.id === interaction.guild.ownerId) {
                        acknowments = 'Server Owner'
                    }

                    const embedg = new MessageEmbed()
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setColor('BLUE')
                        .setDescription(`<@${user.id}> • ID: ${user.id}`)
                        .setThumbnail(user.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`Information in ${interaction.guild.name}`,
                            `
                             • **Joined:** <t:${Math.floor(member.joinedAt / 1000)}:F> [<t:${Math.floor(member.joinedAt / 1000)}:R>]
                             • **Nickname:** ${member.nickname || "*None*"}
                             • **Booster:** ${member.premiumSince ? `${process.env.SUCCESS_EMOJI}` : `${process.env.FAILURE_EMOJI}`}
                             • **Boosting Since:** ${check} 
                             • **Acknowments:** ${acknowments}
                    `
                        )

                    interaction.editReply({
                        embeds: [embedg],
                        components: [rowg]
                    })
                    break;

                case "user-roles":

                    i.deferUpdate()

                    const rowr = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('Account')
                                .setStyle('PRIMARY')
                                .setCustomId('user-acc')
                        )
                        .addComponents(
                            new MessageButton()
                                .setLabel('Guild')
                                .setStyle('PRIMARY')
                                .setCustomId('user-guild')
                        )
                        .addComponents(
                            new MessageButton()
                                .setLabel('Roles')
                                .setStyle('SUCCESS')
                                .setCustomId('user-roles')
                                .setDisabled(true)
                        )
                        .addComponents(
                            new MessageButton()
                                .setLabel('Permissions')
                                .setStyle('PRIMARY')
                                .setCustomId('user-perms')

                        )
                    const roles = member.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(role => role.toString())
                        .slice(0, -1);

                    const embedr = new MessageEmbed()
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setColor('BLUE')
                        .setDescription(`<@${user.id}> • ID: ${user.id}`)
                        .setThumbnail(user.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`Roles [${roles.length}]:`, `
                    ${roles.length ? roles.join(', ') : 'None'}
                    `)

                    interaction.editReply({
                        embeds: [embedr],
                        components: [rowr]
                    })
                    break;

                case "user-perms":
                    i.deferUpdate()

                    const rowrr = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Account')
                            .setStyle('PRIMARY')
                            .setCustomId('user-acc')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Guild')
                            .setStyle('PRIMARY')
                            .setCustomId('user-guild')
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Roles')
                            .setStyle('PRIMARY')
                            .setCustomId('user-roles')
                            
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('Permissions')
                                .setStyle('SUCCESS')
                                .setDisabled(true)
                            .setCustomId('user-perms')

                    )
                    const perms = member.permissions.toArray();
                    let permstext = "";
                    if (perms.indexOf("ADMINISTRATOR") === -1) {
                        permstext = perms.join(", ") || "Without permissions.";
                    } else {
                        permstext = "ADMINISTRATOR (All permissions)";
                    }
                    const embedrr = new MessageEmbed()
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setColor('BLUE')
                        .setDescription(`<@${user.id}> • ID: ${user.id}`)
                        .setThumbnail(user.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField('Permissions', `${ee(permstext)}`)
                    
                    interaction.editReply({embeds: [embedrr], components: [rowrr]})
            }
        })


        collector.on("end", (collected, reason) => {
            const ended = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Account')
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                    .setCustomId('user-acc')
                )
                .addComponents(
                    new MessageButton()
                    .setLabel('Guild')
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                    .setCustomId('user-guild')
                )
                .addComponents(
                    new MessageButton()
                    .setLabel('Roles')
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                    .setCustomId('user-roles')

                )
                .addComponents(
                    new MessageButton()
                    .setLabel('Permissions')
                    .setStyle('SECONDARY')
                    .setDisabled(true)
                    .setCustomId('user-perms')

                )
            interaction.editReply({
                components: [ended]
            })
        })
    }
}
function ee(str) {
    str = str.replace(/\_/g, " ");
    const split = str.trim().split(" ")
    const splitFixed = [];
    split.forEach((e) => {
        e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
        splitFixed.push(e);
    });
    return splitFixed.join(" ");
};