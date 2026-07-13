const Levels = require('discord-xp')
const schema = require("../../models/level");

module.exports = {
    name: 'add',
    description: "Add level or xp to a user",
    premium: true,
    options: [{
        name: 'level',
        type: 'SUB_COMMAND',
        description: 'Add level(s) to a user',
        options: [{
                name: 'target',
                type: 'USER',
                description: 'The member to add to the level(s) to',
                required: true,
            },
            {
                name: 'amount',
                type: 'INTEGER',
                description: 'The Amount of level(s) to add',
                required: true,
            }
        ]
    }, {
        name: 'xp',
        type: 'SUB_COMMAND',
        description: 'Add xp to a user',
        options: [{
                name: 'target',
                type: 'USER',
                description: 'The member to add to the xp to',
                required: true,
            },
            {
                name: 'amount',
                type: 'INTEGER',
                description: 'The Amount of xp to add',
                required: true,
            }
        ]
    }, ],
    userPermissions: ['MANAGE_MESSAGES'],
    run: async (client, interaction, args) => {
        const [SubCommand] = args;
        if (SubCommand === "level") {
            const data = await schema.findOne({
                Guild: interaction.guild.id
            });
            const xpamount = interaction.options.getInteger('amount');
            const target = interaction.options.getMember('target');
            const user = (target.id);

            if (!data) return interaction.followUp({
                content: `${process.env.FAILURE_EMOJI} Leveling System hasn't been enabled on this server. To enable it run the following command: \`${process.env.PREFIX}enable-leveling\``,

            });
            Levels.appendLevel(user, interaction.guild.id, xpamount)

            interaction.followUp({
                content: `${process.env.SUCCESS_EMOJI} I have added ${xpamount} level(s) to <@${target.id}>`,

            })
        } else if (SubCommand === "xp") {
            const data = await schema.findOne({
                Guild: interaction.guild.id
            });
            const xpamount = interaction.options.getInteger('amount');
            const target = interaction.options.getMember('target');
            const user = (target.id);

            if (!data) return interaction.followUp({
                content: `${process.env.FAILURE_EMOJI} Leveling System hasn't been enabled on this server. To enable it run the following command: \`${process.env.PREFIX}enable-leveling\``,

            });

            Levels.appendXp(user, interaction.guild.id, xpamount)

            interaction.followUp({
                content: `${process.env.SUCCESS_EMOJI}I have added ${xpamount} xp to <@${target.id}>`,

            })
        }

    }
}