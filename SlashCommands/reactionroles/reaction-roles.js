const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu
} = require('discord.js')
const rrModel = require('../../models/reactionroles');

module.exports = {
    name: 'reaction-roles',
    description: 'Reaction Roles Config!',
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES'],
    options: [{
            name: 'add-role',
            type: 'SUB_COMMAND',
            description: 'Add a custom Reaction Role',
            options: [{
                    name: 'role',
                    description: 'Role to be assigned as Reaction Role',
                    type: 'ROLE',
                    required: true,
                },
                {
                    name: 'emoji',
                    description: 'Emoji for the role',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'description',
                    description: 'Description of this role',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'remove-role',
            type: 'SUB_COMMAND',
            description: 'Remove a custom Reaction Role',
            options: [{
                name: 'role',
                description: 'Role to be assigned as Reaction Role',
                type: 'ROLE',
                required: true,
            }, ],
        },
        {
            name: 'panel',
            type: 'SUB_COMMAND',
            description: 'Reaction Roles Panel',
            options: [{
                name: 'channel',
                description: 'The channel into which the panel must be sent',
                type: 'CHANNEL',
                required: true,
            }, ],
        },
    ],
    run: async (client, interaction, args) => {
        const [SubCommand] = args;

        if (SubCommand === "add-role") {
            const role = interaction.options.getRole('role');
            const roleDescription = interaction.options.getString('description') || null;
            const roleEmoji = interaction.options.getString('emoji') || null;

            if (role.position >= interaction.guild.me.roles.highest.position) return interaction.followUp('I can\'t assign a role that is higher or equal to me');

            const guildData = await rrModel.findOne({
                guildId: interaction.guildId
            })

            const newRole = {
                roleId: role.id,
                roleDescription,
                roleEmoji,
            }

            if (guildData) {
                const roleData = guildData.roles.find((x) => x.roleId === role.id);

                if (roleData) {
                    roleData = newRole;
                } else {
                    guildData.roles = [...guildData.roles, newRole]
                }

                await guildData.save()
            } else {
                await rrModel.create({
                    guildId: interaction.guildId,
                    roles: newRole
                })
            }

            interaction.followUp('Created a new Reaction Role: ' + role.name)
        } else if (SubCommand === "remove-role") {
            const role = interaction.options.getRole('role');

            const guildData = await rrModel.findOne({
                guildId: interaction.guildId
            })

            if (!guildData) return interaction.followUp("There is no roles inside of this server");

            const guildRoles = guildData.roles;
            const findRole = guildRoles.find(x => x.roleId === role.id);
            if (!findRole) return interaction.followUp('That role is not added in the reaction roles list');

            const filteredRoles = guildRoles.filter(x => x.roleId !== role.id);
            guildData.roles = filteredRoles;

            await guildData.save();
            interaction.followUp(`Removed ${role.name}`)
        } else if (SubCommand === "panel") {
            const channel = interaction.options.getChannel('channel')
            const guildData = await rrModel.findOne({
                guildId: interaction.guildId
            })

            if (!guildData?.roles) return interaction.followUp("There is no roles inside of this server");

            const options = guildData.roles.map(x => {
                const role = interaction.guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription || "No Description!",
                    emoji: x.roleEmoji
                };
            });

            const panelEmbed = new MessageEmbed()
                .setTitle('Choose a Role from the following Drop Down Menu!')
                .setColor('BLUE')
                .setAuthor({
                    name: process.env.BOT_NAME,
                    iconURL: process.env.BOT_ICON
                })

            const components = [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                    .setCustomId('reaction-roles')
                    .setMaxValues(1)
                    .addOptions(options)
                    .setPlaceholder(`Choose a Role from Here!`)
                )
            ]

            interaction.followUp(`The Panel will be sent to ${channel}`)
            channel.send({
                embeds: [panelEmbed],
                components
            })

        }
    }
}