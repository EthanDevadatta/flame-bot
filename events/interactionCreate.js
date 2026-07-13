const client = require("../index");
const {
    owners
} = require('../json/owners.json');
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const {
    createTranscript
} = require('discord-html-transcripts');
const premiumSchema = require('../models/premium')
const {
    dependencies
} = require('../package.json');
const ver = dependencies['discord.js'];
const {
    cpu,
    mem
} = require('node-os-utils');
const {
    connection,
    models
} = require("mongoose");
const values = Object.values(models);

const os = require('os')

client.on("interactionCreate", async (interaction) => {

    // Slash Command Handler
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({
            content: "An Error Has Occured!",
            ephemeral: true
        }) && client.slashCommands.delete(interaction.commandName)

        await interaction.deferReply({
            ephemeral: cmd.ephemeral ? cmd.ephemeral : false
        }).catch(() => {});

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);


        // Premium Check
        const embed = new MessageEmbed()
            .setTitle('This is a premium command!')
            .setThumbnail('https://media.discordapp.net/attachments/847794443180048394/847800054655483904/flame_website_logo.gif')
            .setDescription('If you want premium join the support server and create a ticket! \n[Click Me](https://discord.gg/FCP2HWksBU) to join!')
            .setTimestamp()
            .setColor('#FFD700');
        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Support Server')
                .setStyle('LINK')
                .setURL(process.env.SERVER_INVITE)
            )
        if (cmd.premium && !(await premiumSchema.findOne({
                User: interaction.user.id
            }))) return interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            components: [button]
        });

        if (cmd.maintenance) {
            if (!owners.includes(interaction.user.id)) {
                return interaction.followUp({
                    content: `${process.env.FAILURE_EMOJI} This command is on maintenance please try later, Thank you!`
                })
            }
        }

        // User permissions
        if (owners.includes(interaction.user.id)) {
            cmd.run(client, interaction, args);
            return;
        } else if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
            return interaction.followUp({
                content: `${process.env.FAILURE_EMOJI} You need \`${cmd.userPermissions || []}\` permissions to run this command`,
                ephemeral: true
            });
        }

        // Bot permissions
        if (!interaction.guild.me.permissions.has(cmd.botPermissions || []))
            return interaction.followUp({
                content: `${process.env.FAILURE_EMOJI} I need \`${cmd.botPermissions || []}\` permissions to run this command`,
                ephemeral: true
            });

        // Owner Only
        if (cmd.ownerOnly) {
            if (!owners.includes(interaction.user.id)) {
                return interaction.followUp({
                    content: `${process.env.FAILURE_EMOJI} Only the Bot Developers are allowed to run this command!`
                })
            }
        };

        cmd.run(client, interaction, args);
    }

    // Context Menu Handler
    if (interaction.isContextMenu()) {
        const command = client.slashCommands.get(interaction.commandName);
        await interaction.deferReply({
            ephemeral: command.ephemeral ? command.ephemeral : false
        });
        if (command) command.run(client, interaction);
    }

    // Reaction Roles Handling
    if (interaction.isSelectMenu()) {
        if (interaction.customId === 'reaction-roles') {
            await interaction.deferReply({
                ephemeral: true
            });
            const roleId = interaction.values[0];
            const role = interaction.guild.roles.cache.get(roleId);
            const memberRoles = interaction.member.roles;
            const hasRole = memberRoles.cache.has(roleId);

            if (hasRole) {
                memberRoles.remove(roleId);
                interaction.followUp({
                    content: `${role} Role Has Been Removed From You`,
                    ephemeral: true
                })
            } else {
                memberRoles.add(roleId);
                interaction.followUp({
                    content: `${role} Role Has Been Given To You`,
                    ephemeral: true
                })
            }
        }

    }

    //Button Handling
    if (interaction.isButton()) {
        await interaction.deferUpdate()
        if (interaction.customId === "stat-refresh") {
            const totalEntries = await values.reduce(async (accumulator, model) => {
                const counts = await model.count();
                return (await accumulator) + counts;
            }, Promise.resolve(0));
            const embed = new MessageEmbed()
                .setAuthor({
                    name: "Flame Bot Stats",
                    iconURL: process.env.BOT_ICON
                })
                .setColor('RED')
                .setTimestamp()
                .addField('<:discordjs:930672405238648852> Discord.js', `• \`v${ver}\``, true)
                .addField('<:node:930684096131244052> Node.js', `• \`${process.version}\``, true)
                .addField(':clock1: Last Restart', `• <t:${~~(Date.now() / 1000 - client.uptime / 1000).toFixed(0)}:R>`, true)
                .addField(':clock12: Last Updated', `• <t:${~~(Date.now() / 1000)}:R>`, true)
                .addField('<:command:930672887776571404> Commands', `• \`${client.commands.size} commands\``, true)
                .addField('<:slashcommands:930672888657379330> Slash Commands', `• \`${client.slashCommands.size} commands\``, true)
                .addField('<:ping:930672890838392863> Latency', `• \`${client.ws.ping} ms\`\n`, true)
                .addField('<:public:814491294142824449> Servers', `• \`${client.guilds.cache.size} servers\``, true)
                .addField('<:members:931074443130843136> Users', `• \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users\``, true)
                .addField('<:channel:931074442140979211> Channels', `• \`${client.channels.cache.size} channels\``, true)
                .addField('<:node:930684096131244052> Operating System',
                    `
                • **Host Name:** ${os.hostname()}
                • **Platform:** ${os.platform()}
                • **Type:** ${os.type()}
                • **Architecture:** ${os.arch()}
                `)
                .addField('<:cpu:930699025915719692> Cpu', `
                • **Model:** ${cpu.model()}
                • **Speed:** ${os.cpus()[0].speed}
                • **Core Count:** ${cpu.count()}
                • **Usage:** ${await cpu.usage()}%
                • **Free:** ${await cpu.free()}% 
            `)
                .addField('<:memory:930672886165946418> Memory', `
                • **Total Memory:** ${await formatBytes(mem.totalMem())}
                • **Used Memory:** ${await formatBytes(mem.totalMem() - process.memoryUsage().heapUsed)}
                • **Free Memory:** ${await formatBytes(process.memoryUsage().heapUsed)} 
            `)
                .addField('<:database:930672889471070220> Database', `
                • **Name:** Mongoose Database
                • **Status:** ${switchTo(connection.readyState)}
                • **Total Data:** ${totalEntries}
            `)
            const refresh = new MessageActionRow().addComponents(
                new MessageButton()
                .setStyle("PRIMARY")
                .setEmoji("🔄")
                .setCustomId("stat-refresh")
                .setLabel("Refresh")
            );
            interaction.message.edit({
                embeds: [embed],
                components: [refresh]
            });
        } else if (interaction.customId === "ticket-open") {
            const db = require('../models/ticket');
            const data = await db.findOne({
                Guild: interaction.guild.id
            });
            const categoryid = data.Category;
            const StaffRoleId = data.StaffR;
            const EveryoneRoleId = interaction.guild.roles.everyone.id

            if (interaction.guild.channels.cache.find(e => e.topic == interaction.user.id)) { 
                return interaction.followUp({
                    content: 'You already have a ticket open',
                    ephemeral: true
                })
            }

            const c = interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                parent: categoryid,
                topic: interaction.user.id,
                permissionOverwrites: [{
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: client.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: StaffRoleId,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: EveryoneRoleId,
                    deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    },],
                type: 'GUILD_TEXT'
            }).then(async c => {
                interaction.followUp({ content: `Ticket Created! <#${c.id}>`, ephemeral: true });
                
                const newtic = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Ticket')
                    .setTimestamp()
                    .setFooter({
                        text: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: interaction.guild.iconURL({
                            dynamic: true
                        })
                    })
                    .setDescription('Hello there, \n The staff will be here shortly mean while tell us about your issue!\nThank You!')
                
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('ticket-close')
                            .setLabel('Close Ticket')
                            .setEmoji('🔒')
                        .setStyle('DANGER') // Red color button
                )

                c.send({
                    content: `<@${interaction.user.id}>, <@&${StaffRoleId}>`, // gotta add & since its  a role
                    embeds: [newtic],
                    components: [row]
                }).then((msg) => msg.pin()) // to pin the message
            })
            
            
        } else if (interaction.customId === "ticket-close") {
            const db = require('../models/ticket');
            const data = await db.findOne({
                Guild: interaction.guild.id
            });
            const TranscriptCID = data.TranscriptC;
            const StaffRoleId = data.StaffR;
            if (!interaction.member.roles.cache.has(StaffRoleId)) {
                return interaction.followUp({
                    content: 'Only Staff Can Close Tickets!',
                    ephemeral: true
                });
            };

            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription('Are you sure you want to close this Ticket?')

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Yes')
                    .setStyle('SUCCESS')
                    .setCustomId('ticket-yes-close')
                )
                .addComponents(
                    new MessageButton()
                    .setLabel('No')
                    .setStyle('DANGER')
                    .setCustomId('ticket-no-close')
                );
             interaction.channel.send({
                embeds: [embed],
                components: [row]
            })

            const collector = await interaction.channel.createMessageComponentCollector({
                time: 15000,
                componentType: "BUTTON",
            })

            collector.on("collect", async (i) => {
                if (i.customId === "ticket-no-close") {
                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "This is not your button",
                        ephemeral: true
                    })
                    const noEmbed = new MessageEmbed()
                        .setDescription('Cancelled!')

                    return interaction.channel.send({
                        embeds: [noEmbed]
                    })
                    // const row2 = new MessageActionRow()
                    //     .addComponents(
                    //         new MessageButton()
                    //         .setLabel('Yes')
                    //         .setStyle('SUCCESS')
                    //         .setDisabled(true)
                    //         .setCustomId('ticket-yes-close')
                    //     )
                    //     .addComponents(
                    //         new MessageButton()
                    //         .setLabel('No')
                    //         .setDisabled(true)
                    //         .setStyle('DANGER')
                    //         .setCustomId('ticket-no-close')
                    //     );

                    // co.edit({
                    //     components: [row2]
                    // })
                } else if (i.customId === "ticket-yes-close") {
                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "This is not your button",
                        ephemeral: true
                    })
                    interaction.channel.send('Closing... Please wait')
                    const user = await client.users.fetch(interaction.channel.topic)

                    const transcript = await createTranscript(interaction.channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `ticket-${interaction.channel.topic}.html`,
                    });
                    const CloseEmbed = new MessageEmbed()
                        .setTitle('Ticket Closed')
                        .setColor('RED')
                        .setDescription(`
                        Ticket Opened by: <@${interaction.channel.topic}> | ${user.tag} \`${user.id}\`
                        Ticket Closed by: ${interaction.user} | ${interaction.user.tag} \`${interaction.user.id}\`
                        \n\n
                        Ticket: \`${interaction.channel.name}\` | \`${interaction.channel.id}\`
                    `)
                        .setFooter({
                            text: interaction.guild.name,
                            iconURL: interaction.guild.iconURL({
                                dynamic: true
                            })
                        })
                    client.channels.cache.get(TranscriptCID).send({
                        embeds: [CloseEmbed],
                        files: [transcript]
                    }).then(() => {
                        interaction.channel.delete()
                    })
                }
            })
        
        }
    }
})

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `Disconnected`
            break;
        case 1:
            status = `Connected`
            break;
        case 2:
            status = `Connecting`
            break;
        case 3:
            status = `Disconnecting`
            break;
    }
    return status;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}