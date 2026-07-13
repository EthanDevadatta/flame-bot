const client = require('../index')

client.on('guildCreate', (guild) => {
    const channel = guild.channels.cache.find(ch => ch.type === "GUILD_TEXT" && ch.permissionsFor(client.user.id).has(["SEND_MESSAGES", "EMBED_LINKS"]))
    if (!channel) return;
    const {
        MessageEmbed,
        MessageActionRow,
        MessageButton
    } = require('discord.js');
    const embed = new MessageEmbed()
        .setAuthor({name: guild.name, iconURL: guild.iconURL({
            dynamic: true
        })})
        .setTitle('Thank You!')
        .setThumbnail(process.env.BOT_ICON)
        .setURL(process.env.BOT_WEBSITE)
        .setDescription(`> Thank you for inviting me! My prefix is \`${process.env.PREFIX}\`\n> You can do \`${process.env.PREFIX}help\` for a list of commads!\n> If you have any questions or inquires then join the [Support Server](https://discord.gg/FCP2HWksBU)`)
        .setColor("#2F3136")
        .setFooter({
            text: process.env.BOT_NAME,
            iconURL: process.env.BOT_ICON
        })
        .setTimestamp()

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Support Server')
            .setStyle('LINK')
            .setURL(process.env.SERVER_INVITE)
        )
        .addComponents(
            new MessageButton()
            .setLabel('Bot Website')
            .setStyle('LINK')
            .setURL(process.env.BOT_WEBSITE)
        );
    channel.send({
        embeds: [embed],
        components: [row]
    })
})