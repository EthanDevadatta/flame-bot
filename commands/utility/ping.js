const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Shows latency ping!',
    run: async (client, message) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const pingEmbed = new MessageEmbed()
            .setTitle('Pong! 🏓')
            .setColor("#2F3136")
            .setFooter({
                text: `${process.env.BOT_NAME}`,
                iconURL: process.env.BOT_ICON_ANIMATED
            })
            .setTimestamp()
            .setDescription(`**Client's Ping**: \` ${client.ws.ping}ms \`\n**Message Ping**: \` ${Date.now() - message.createdTimestamp}ms \`\n **Uptime**: \` ${days} Day(s), ${hours} Hour(s), ${minutes} Minute(s), ${seconds} Second(s) \``)

        message.channel.send({
            embeds: [pingEmbed]
        });
    }
}