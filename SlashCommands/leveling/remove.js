const Levels = require('discord-xp')
const schema = require("../../models/level");

module.exports = {
    name: 'remove',
    description: "Remove level or xp to a user",
    premium: true,
    options: [{
        name: 'level',
        type: 'SUB_COMMAND',
        description: 'Remove level(s) from a user',
        options: [{
                name: 'target',
                type: 'USER',
                description: 'The member to remove level(s) from',
                required: true,
            },
            {
                name: 'amount',
                type: 'INTEGER',
                description: 'The Amount of level(s) to remove`',
                required: true,
            }
        ]
    }, {
        name: 'xp',
        type: 'SUB_COMMAND',
        description: 'Remove xp from a user',
        options: [{
                name: 'target',
                type: 'USER',
                description: 'The member to remove xp from',
                required: true,
            },
            {
                name: 'amount',
                type: 'INTEGER',
                description: 'The Amount of xp to remove',
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
            Levels.subtractLevel(user, interaction.guild.id, xpamount)

            interaction.followUp({
                content: `${process.env.SUCCESS_EMOJI} have removed ${xpamount} level(s) from <@${target.id}>`,

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

            Levels.subtractXp(user, interaction.guild.id, xpamount)

            interaction.followUp({
                content: `${process.env.SUCCESS_EMOJI} I have removed ${xpamount} xp from <@${target.id}>`,

            })
        }

    }
}