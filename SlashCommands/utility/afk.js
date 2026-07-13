const {
    MessageEmbed
} = require('discord.js')
const db = require('../../models/afk');
module.exports = {
    name: 'afk',
    description: 'Set Yourself in AFK',
    options: [{
        name: 'reason',
        type: 'STRING',
        description: 'Reason for AFK',
        required: false,
    }, ],
    run: async (client, interaction, options) => {
        const afkreason = interaction.options.getString('reason') || 'No reason';
        const time = Date.now();
        const timestp = Math.floor(time / 1000);
        db.findOne({
            Guild: interaction.guildId,
            Member: interaction.user.id
        }, async (err, data) => {
            if (data) {
                return;
            } else {
                new db({
                    Guild: interaction.guildId,
                    Member: interaction.user.id,
                    Content: afkreason, 
                    TimeAgo: timestp
                }).save()
                const afksave = new MessageEmbed()
                    .setTitle(`${interaction.user.tag} is now AFK`)
                    .setColor('BLUE')
                    .setDescription(`You have been set to AFK\n**Reason:** ${afkreason}`)
                    .setAuthor({
                        name: interaction.user.tag,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTimestamp()

                interaction.followUp({
                    embeds: [afksave]
                })
            }
        })

    }
}