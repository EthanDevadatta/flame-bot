const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Schema = require('../../models/ticket');

module.exports = {
    name: 'ticket',
    description: 'Ticket System Setup',
    options: [{
        name: 'set',
        type: 'SUB_COMMAND',
        description: 'Configuration for the ticket system',
        options: [{
            name: 'category',
            type: 'CHANNEL',
            channelTypes: ['GUILD_CATEGORY'],
            description: 'Category in which all the tickets will be placed',
            required: true,
        }, {
            name: 'panel-channel',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            description: 'Channel in which the panel will be sent',
            required: true,
        }, {
            name: 'staff-role',
            type: 'ROLE',
            description: 'Staff Role will give access in tickets',
            required: true,
        }, {
            name: 'transcript-channel',
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
            description: 'Channel in which all the ticket transcripts will be sent',
            required: true,
        }, {
            name: 'panel-name',
            type: 'STRING',
            description: 'The Title for the panel name',
            required: false,
        }, ],
    }, {
        name: 'add',
        type: 'SUB_COMMAND',
        description: 'Add a user to the ticket',
        options: [{
            name: 'user',
            type: 'USER',
            description: 'The user to add to the ticket',
            required: true
        }]
    }, {
        name: 'remove',
        type: 'SUB_COMMAND',
        description: 'Remove a user from the ticket',
        options: [{
            name: 'user',
            type: 'USER',
            description: 'The user to remove from the ticket',
            required: true
        }]
    }, ],
    run: async (client, interaction, args) => {
        const [SubCommand] = args;

        if (SubCommand === 'set') {
            const category = interaction.options.getChannel('category');
            const panelChannel = interaction.options.getChannel('panel-channel');
            const staffRole = interaction.options.getRole('staff-role');
            const transcriptChannel = interaction.options.getChannel('transcript-channel');
            const panelName = interaction.options.getString('panel-name') || 'Tickets'

            Schema.findOne({
                Guild: interaction.guild.id
            }, async (err, data) => {
                if (data) data.delete()
                new Schema({
                    Guild: interaction.guild.id,
                    Category: category.id,
                    PanelC: panelChannel.id,
                    StaffR: staffRole.id,
                    TranscriptC: transcriptChannel.id,
                    PanelN: panelName
                }).save();
                const embed = new MessageEmbed()
                    .setTitle('Ticket Configuration')
                    .setColor('RED')
                    .setDescription(`${process.env.SUCCESS_EMOJI} Successfully Set Ticket System`)
                    .setFooter({
                        text: process.env.BOT_NAME,
                        iconURL: process.env.BOT_ICON
                    })

                interaction.followUp({
                    embeds: [embed]
                })
                const embed2 = new MessageEmbed()
                    .setTitle(panelName)
                    .setColor('RED')
                    .setDescription(`Click 🎟️ to open a ticket`)
                    .setFooter({
                        text: process.env.BOT_NAME,
                        iconURL: process.env.BOT_ICON
                    })

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('ticket-open')
                        .setEmoji('🎟️')
                        .setLabel('Open a Ticket')
                        .setStyle('PRIMARY')
                    )
                panelChannel.send({
                    embeds: [embed2],
                    components: [row]
                })
            })
        } else if (SubCommand === 'add') {
            const db = require('../../models/ticket');
            const data = await db.findOne({
                Guild: interaction.guild.id
            });
            const StaffRoleId = data.StaffR;
            const EveryoneRoleId = interaction.guild.roles.everyone.id;
            const user = interaction.options.getUser('user');
            if (c.name.includes('ticket')) {
                c.edit({
                    permissionOverwrites: [{
                        id: interaction.channel.topic,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: client.user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: user,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: StaffRoleId,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: EveryoneRoleId,
                        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, ],
                }).then(() => {
                    interaction.followUp(`${user.id} has been added`)
                })
            } else {
                interaction.followUp('Your not in  a ticket')
            }
        } else if  (SubCommand === 'remove') {
            const db = require('../../models/ticket');
            const data = await db.findOne({
                Guild: interaction.guild.id
            });
            const StaffRoleId = data.StaffR;
            const EveryoneRoleId = interaction.guild.roles.everyone.id
            const user = interaction.options.getUser('user');
            if (c.name.includes('ticket')) {
                c.edit({
                    permissionOverwrites: [{
                        id: interaction.channel.topic,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: client.user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: user,
                        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: StaffRoleId,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, {
                        id: EveryoneRoleId,
                        deny: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    }, ],
                }).then(() => {
                    interaction.followUp(`${user.id} has been removed`)
                })
            } else {
                interaction.followUp('Your not in a ticket')
            }
        }


    }
}