const client = require('../index');

client.on("guildCreate", async guild => {
    try {
        if (guild.me.permissions.has('MANAGE_ROLES')) {
            if (!guild.roles.cache.some((r) => r.name === ('Muted'))) {
                await guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#818386'
                    }
                });
                let Muted = guild.roles.cache.find(role => role.name === 'Muted');
                const channels = guild.channels.cache.filter(c => c.type === 'text')
                channels.forEach(ch => ch.updateOverwrite(Muted, {
                    SEND_MESSAGES: false
                }));
            } else return
        } else return
    } catch (err) {
        console.log(err)
    }
});