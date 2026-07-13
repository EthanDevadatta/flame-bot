const warnModel = require('../../models/WarningSystem');

const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'warnings',
    description: 'Displays a Users Warnings',
    options: [{
        name: 'target',
        description: 'The user you want to view the warnings',
        type: 'USER',
        required: true,
    }],
    run: async (client, interaction, options) => {
        const user = interaction.options.getUser('target');

        const userWarnings = await warnModel.find({
            userId: user.id,
            guildId: interaction.guildId,
        });

        if (!userWarnings?.length) return interaction.followUp(`${user.tag} has no warnings in this server.`);

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(warn.moderatorId);

            return [`**Warn ID:** ${warn._id}`,
                `**Moderator:** ${moderator || "*Moderator is no longer in this server*"}`,
                `**Date:** <t:${warn.timestamp}:F>`,
                `**Reason:** *${warn.reason}*`,
            ].join("\n");
        }).join("\n\n");

        const embed = new MessageEmbed()
            .setTitle(`${user.tag}'s Warnings`)
            .setThumbnail(user.displayAvatarURL({
                dynamic: true,
            }))
            .setDescription(embedDescription)
            .setColor('BLURPLE')
        interaction.followUp({
            embeds: [embed]
        })
    }
}