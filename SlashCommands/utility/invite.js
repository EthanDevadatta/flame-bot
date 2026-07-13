const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "invite",
    description: "Invite Flame Bot",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle('Invite').setDescription('Add Flame Bot to your Guild!').setColor('RED')
        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Invite Here')
            .setEmoji('🔗')
            .setStyle('LINK')
            .setURL('https://dsc.gg/flamebot'),
            new MessageButton()
            .setLabel('Support Server')
            .setEmoji('<:discord_staff:814491281832804416>')
            .setStyle('LINK')
            .setURL('https://discord.gg/FCP2HWksBU'),
        )
        await interaction.followUp({
            embeds: [embed],
            components: [button]
        })

    }
}