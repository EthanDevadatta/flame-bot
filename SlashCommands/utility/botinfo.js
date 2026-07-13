const {
    MessageEmbed
} = require("discord.js");
const {
    dependencies
} = require('../../package.json');

module.exports = {
    name: 'botinfo',
    description: "Shows the bot info!",
    run: async (client, interaction, args) => {
        let embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`Bot Info`)
            .setThumbnail(process.env.BOT_ICON)
            .setURL(process.env.BOT_WEBSITE)
            .setDescription('```Flame Bot is a multipurpose bot with Moderation, Leveling System, Fun commands, Utility Commands, Giveaways commands, Server Backup and more!```')
            .addField('**__General Information__**',
                `**❯ Client:** Flame Bot#6221 (\`796279185080582185\`)
            **❯ Created On:** 7:29 AM January 6, 2021
            **❯ Developer:** FiredragonPlayz#0087
            **❯ Commands:** ${client.commands.size}
            **❯ Slash Commands:** ${client.slashCommands.size}
            \u200b`
            )
            .addField('**__Stats__**',
                `**❯ Servers:** ${client.guilds.cache.size}
            **❯ Channels:** ${client.channels.cache.size}
            **❯ Users:** ${client.users.cache.size}
            \u200b`
            )
            .addField('**__Backend Details__**',
                `**❯ Version:** [5.2.1](https://flamebot.gq)
            **❯ Node.js:** [${process.version}](https://nodejs.org/en/)
            **❯ Discord.js:** [${dependencies['discord.js']}](https://discord.js.org/)
            \u200b`
            )
            .addField('**__Links__**',
                `[Invite](https://dsc.gg/flamebot) • [Support Server](https://discord.gg/FCP2HWksBU) • [Website](https://flamebot.netlify.app)`
            )
            .setImage(`https://media.discordapp.net/attachments/796358841038143488/810081297640849418/standard.gif`)
            .setTimestamp()
        interaction.followUp({
            embeds: [embed]
        })
    }
}