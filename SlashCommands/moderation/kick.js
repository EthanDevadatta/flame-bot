const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kick Members',
    userPermissions: ["KICK_MEMBERS"],
    options: [{
            name: 'target',
            description: 'User to Kick',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for kicking',
            type: 'STRING',
            required: false,
        }
    ],
    run: async (client, interaction, options) => {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "No Reason Given!";

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({
            content: `${process.env.FAILURE_EMOJI} You can\'t kick this member cause their role is higher than yours`,
            empheral: true
        });
        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.followUp({
            content: `${process.env.FAILURE_EMOJI} I can't kick this member since thier role is higher than mine!`,
            epheremal: true,
        });

        const DmEmbed = new MessageEmbed()
            .setTitle('You Have Been Kicked!')
            .setColor('RED')
            .setTimestamp()
            .setDescription(`You have been kicked from ${interaction.guild.name}!\n**Reason:** \`${reason}\`\n**Moderator:** ${interaction.user.tag}`)

        await target.send({
            embeds: [DmEmbed]
        });
        target.kick(reason);

        const embed = new MessageEmbed()
            .setTitle('Successfully Kicked!')
            .setColor('GREEN')
            .setTimestamp()
            .setDescription(`${process.env.SUCCESS_EMOJI} ${target.user.tag} has been successfully kicked! Reason: *${reason}*`)

        interaction.followUp({
            embeds: [embed]
        });

    },
};