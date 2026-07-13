const Discord = require('discord.js');

module.exports = {
    name: "meme",
    description: "Gives you a fresh meme ;)",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const fetch = require('node-fetch')
        async function embed() {
            let embed1 = null
            await fetch(`https://meme-api.herokuapp.com/gimme`).then(res => res.json().then(url => {
                embed1 = new Discord.MessageEmbed()
                    .setTitle(url.title)
                    .setImage(url.url)
                    .setTimestamp()
                    .setColor("RED")
                    .setFooter({text:`${url.ups} ⬆️`})
            }))
            return embed1
        }
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId('reload')
                .setLabel('Next Meme')
                .setStyle('SUCCESS'),
            )
        const disabled = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId('reload')
                .setLabel('Next Meme')
                .setStyle('SUCCESS')
                .setDisabled(true)

            )

        let m = await interaction.followUp({
            embeds: [await embed()],
            components: [row]
        })

        const collector = m.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 60000,
        });
        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                i.deferUpdate()
                await update(m)
                collector.stop()
            } else {
                i.reply({
                    content: `These buttons aren't for you!`,
                    ephemeral: true
                });
            }
        })
        collector.on('end', (mes, r) => {
            if (r == 'time') {
                m.edit({
                    components: [disabled],
                })
            }
        })

        async function update(m) {
            m.edit({
                embeds: [await embed()]
            }).catch(e => console.log(e.requestData.json.embeds))

            const collector = m.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 120000,
            });
            collector.on('collect', async i => {
                if (i.user.id === interaction.user.id) {

                    i.deferUpdate()
                    await update(m)
                    collector.stop()
                } else {
                    i.reply({
                        content: `These buttons aren't for you!`,
                        ephemeral: true
                    });
                }
            })
            collector.on('end', (mes, r) => {
                if (r == 'time') {
                    m.edit({
                        components: [disabled],
                    })
                }
            })
        }
    }
}