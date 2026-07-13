const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "nuke",
    description: "Nuke a channel",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        let clearchannel = interaction.channel
        const embedconfirm = new MessageEmbed()
            .setTitle('Are you sure?')
            .setDescription('> This will delete the current channel and make a new one.')
            .setColor('RED')

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Yes')
                .setStyle('DANGER')
                .setCustomId('nuke-yes')
            )
            .addComponents(
                new MessageButton()
                .setLabel('No')
                .setStyle('SUCCESS')
                .setCustomId('nuke-no')
            );

        interaction.followUp({
            embeds: [embedconfirm],
            components: [row]
        })

        const collector = await interaction.channel.createMessageComponentCollector({
            time: 15000,
            componentType: "BUTTON",
        })
        collector.on("collect", async (i) => {

            if (i.customId === "nuke-yes") {
                try {
                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "Don't touch other people's button",
                        ephemeral: true
                    })

                    i.deferUpdate()
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Nuked!')
                        .setDescription(`${process.env.SUCCESS_EMOJI} This channel just got nuked!!`)
                        .setImage('https://media.discordapp.net/attachments/772390491303575582/819086461739335720/tenor_5.gif?width=560&height=472')
                        .setTimestamp()
                    clearchannel.clone().then(clearchannel => clearchannel.send({
                        embeds: [embed]
                    }))
                    clearchannel.delete()
                } catch (e) {
                    i.reply({
                        content: 'An error occurred',
                        ephemeral: true
                    })
                }
            } else if (i.customId === "nuke-no") {
                if (i.user.id !== interaction.user.id) return i.reply({
                    content: "Don't touch other people's button",
                    ephemeral: true
                })

                i.deferUpdate()
                const noembed = new MessageEmbed()
                    .setDescription('The Nuke Is Cancelled')
                    .setColor('RED')
                interaction.followUp({
                    embeds: [noembed]
                })
                const embedconfeirm = new MessageEmbed()
                    .setTitle('Are you sure?')
                    .setDescription('> This will delete the current channel and make a new one.')
                    .setColor('RED')

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Yes')
                        .setStyle('DANGER')
                        .setCustomId('nuke-yes')
                        .setDisabled(true)
                    )
                    .addComponents(
                        new MessageButton()
                        .setLabel('No')
                        .setStyle('SUCCESS')
                        .setCustomId('nuke-no')
                        .setDisabled(true)
                    );

                interaction.editReply({
                    embeds: [embedconfeirm],
                    components: [row]
                })
            }
        })

    }
}