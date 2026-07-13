const client = require('../index');

client.on('guildCreate', (guild) => {
    try {
        const logsChannel = '826774809404112897';
        const {
            MessageEmbed,
            MessageActionRow,
            MessageButton
        } = require('discord.js');
        const channel = guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE")).createInvite({
            maxAge: 0,
            maxUses: 0,
        }).then((invite) => {
            const time = Date.now();
            const timestp = Math.floor(time / 1000);
            const Owner = guild.fetchOwner()
            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('Added To Guild!')
                .addField('Guild Info', `> ${guild.name} • \`${guild.id}\`• **${guild.memberCount}** members!`)
                .addField('Owner Info', `> <@${guild.ownerId}> • \`${guild.ownerId}\``)
                .addField('Invite Link', `> [Click Me](${invite.url})`)
                .addField('Joined On:', `> Added <t:${timestp}:R>`)
                .setThumbnail(guild.iconURL({
                    dynamic: true
                }))
                .setFooter({text:`Currently in ${client.guilds.cache.size} guilds!`})
                .setTimestamp()

            const button = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Join that Guild')
                        .setStyle('LINK')
                        .setURL(invite.url)
                );
            client.channels.cache.get(logsChannel).send({
                embeds: [embed],
                components: [button]
            })

        })
    } catch (error) {
        console.error(error)
    }
})