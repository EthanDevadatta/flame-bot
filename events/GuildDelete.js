const client = require('../index');

client.on('guildDelete', (guild) => {
    const logsChannel = '826774809404112897';
    const {
        MessageEmbed,
        MessageActionRow,
        MessageButton
    } = require('discord.js');
        const time = Date.now();
        const timestp = Math.floor(time / 1000);
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Removed from Guild!')
            .addField('Guild Info', `> ${guild.name} • \`${guild.id}\`• **${guild.memberCount}** members!`)
            .addField('Owner Info', `> <@${guild.ownerId}> • \`${guild.ownerId}\``)
            .addField('Removed On:', `> Removed <t:${timestp}:R>`)
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))
            .setFooter({text:`Currently in ${client.guilds.cache.size} guilds!`})
            .setTimestamp()
        client.channels.cache.get(logsChannel).send({
            embeds: [embed],
        })

    
})