const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'ban Members',
    userPermissions: ["BAN_MEMBERS"],
    options: [{
            name: 'target',
            description: 'User to Ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for banning',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, options) => {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "No Reason Given!";

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({
            content: `${process.env.FAILURE_EMOJI} You can\'t ban this member cause their role is higher than yours`,
            empheral: true
        });
        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({
            content: `${process.env.FAILURE_EMOJI} I can't ban this member since thier role is higher than mine!`,
            epheremal: true,
        });

        const DmEmbed = new MessageEmbed()
            .setTitle('You Have Been Banned!')
            .setColor('RED')
            .setTimestamp()
            .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
            .setDescription(`You have been banned from ${interaction.guild.name}!\n**Reason:** \`${reason}\`\n**Moderator:** ${interaction.user.tag}`)

        await target.send({
            embeds: [DmEmbed]
        });
        target.ban({
            reason
        });

        const embed = new MessageEmbed()
            .setTitle('Successfully Banned!')
            .setColor('GREEN')
            .setTimestamp()
            .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
            .setDescription(`${process.env.SUCCESS_EMOJI} ${target.user.tag} has been successfully banned! Reason: *${reason}*`)

        interaction.followUp({
            embeds: [embed]
        });

    },
};
