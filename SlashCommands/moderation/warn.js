const WarnDB = require('../../models/WarningSystem');
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'Warn a user',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [{
            name: 'target',
            description: 'User to be warned',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for the warn',
            type: 'STRING',
            required: true,
        },
    ],
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('target');
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');
        const time = Date.now();
        const timestp = Math.floor(time / 1000);

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({
            content: `${process.env.FAILURE_EMOJI} You can\'t warn this member cause their role is higher than yours`,
            empheral: true
        });

        new WarnDB({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.user.id,
            reason,
            timestamp: timestp
        }).save();

        const userembed = new MessageEmbed()
            .setTitle(`${user.tag}`)
            .setDescription(`You have been warned in ${interaction.guild.name}`)
            .addFields({
                name: `> **For the reason:** \`${reason}\``,
                value: `> **By the Moderator:** ${interaction.user.tag}`
            }, )
            .setFooter({text:'We highly recommend not to do this again!'})
            .setColor('RED')
            .setTimestamp()

        user.send({
            embeds: [userembed]
        }).catch(console.log);

        const embed = new MessageEmbed()
            .setTitle(`${process.env.SUCCESS_EMOJI} The member has been successfully warned!`)
            .setDescription(`${user.tag} has been warned! Reason: \`${reason}\``)
             .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
            .setColor('GREEN')
            .setTimestamp()

        interaction.followUp({
            embeds: [embed]
        });

    }

}