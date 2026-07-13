const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Unban Members',
    userPermissions: ["BAN_MEMBERS"],
    options: [{
        name: 'target',
        description: 'User to Unban',
        type: 'STRING',
        required: true,
    }, ],
    run: async (client, interaction, options) => {
        const userID = interaction.options.getString('target');

        interaction.guild.members.unban(userID).then((user) => {
            interaction.followUp({
                content: `${user.tag} has been unbanned from this guild!`
            })
        }).catch(() => {
            interaction.followUp({
                content: `Please Give a valid banned members id`
            })
        })

    },
};