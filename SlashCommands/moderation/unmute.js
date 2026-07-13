const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');
const db = require("../../models/mute");

module.exports = {
    name: "unmute",
    description: "Unmute a user",
    userPermissions: ["MANAGE_MESSAGES"],
    botpermissions: ["MANAGE_ROLES"],
    options: [{
        name: 'target',
        description: 'Member to Unmute',
        type: 'USER',
        required: true,
    }],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getMember('target');
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (user.roles.cache.some(role => role.name == 'Muted')) {

            db.findOne({
                guildid: interaction.guild.id,
                user: user.user.id
            }, async (err, data) => {
                if (err) throw err;
                if (!data) {
                    user.roles.remove(muteRole.id);
                    const embed = new MessageEmbed()
                        .setDescription('User has been Unmuted')
                        .setColor('RED')
                    return interaction.followUp({
                        embeds: [embed]
                    })
                }
                if (data) {

                    data.roles.map((w, i) => user.roles.set(w))
                    await db.findOneAndDelete({
                        user: user.user.id,
                        guildid: interaction.guild.id
                    })
                    const embed = new MessageEmbed()
                        .setDescription('User has been Unmuted')
                        .setColor('RED')
                    interaction.followUp({
                        embeds: [embed]
                    })
                }
            })

        } else {
            const embed = new MessageEmbed()
                .setDescription('User is not Muted')
                .setColor('RED')
            interaction.followUp({
                embeds: [embed]
            })
        }
    }
}