const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
} = require('discord.js');
const {
    dependencies
} = require('../../package.json');
const ver = dependencies['discord.js'];
const {
    cpu,
    mem
} = require('node-os-utils');
const {
    connection,
    models
} = require("mongoose");
const values = Object.values(models);

const os = require('os')

module.exports = {
    name: "stats",
    ownerOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        const totalEntries = await values.reduce(async (accumulator, model) => {
            const counts = await model.count();
            return (await accumulator) + counts;
        }, Promise.resolve(0));
        const embed = new MessageEmbed()
            .setAuthor({
                name: "Flame Bot Stats",
                iconURL: process.env.BOT_ICON
            })
            .setColor('RED')
            .setTimestamp()
            .addField('<:discordjs:930672405238648852> Discord.js', `• \`v${ver}\``, true)
            .addField('<:node:930684096131244052> Node.js', `• \`${process.version}\``, true)
            .addField(':clock1: Last Restart', `• <t:${~~(Date.now() / 1000 - client.uptime / 1000).toFixed(0)}:R>`, true)
            .addField(':clock12: Last Updated', `• <t:${~~(Date.now() / 1000)}:R>`, true)
            .addField('<:command:930672887776571404> Commands', `• \`${client.commands.size} commands\``, true)
            .addField('<:slashcommands:930672888657379330> Slash Commands', `• \`${client.slashCommands.size} commands\``, true)
            .addField('<:ping:930672890838392863> Latency', `• \`${client.ws.ping}ws\`\n`, true)
            .addField('<:public:814491294142824449> Servers', `• \`${client.guilds.cache.size} servers\``, true)
            .addField('<:members:931074443130843136> Users', `• \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users\``, true)
            .addField('<:channel:931074442140979211> Channels', `• \`${client.channels.cache.size} channels\``, true)
            .addField('<:node:930684096131244052> Operating System',
                `
                • **Host Name:** ${os.hostname()}
                • **Platform:** ${os.platform()}
                • **Type:** ${os.type()}
                • **Architecture:** ${os.arch()}
                `)
            .addField('<:cpu:930699025915719692> Cpu', `
                • **Model:** ${cpu.model()}
                • **Speed:** ${os.cpus()[0].speed}
                • **Core Count:** ${cpu.count()}
                • **Usage:** ${await cpu.usage()}%
                • **Free:** ${await cpu.free()}% 
            `)
            .addField('<:memory:930672886165946418> Memory', `
                • **Total Memory:** ${await formatBytes(mem.totalMem())}
                • **Used Memory:** ${await formatBytes(mem.totalMem() - process.memoryUsage().heapUsed)}
                • **Free Memory:** ${await formatBytes(process.memoryUsage().heapUsed)} 
            `)
            .addField('<:database:930672889471070220> Database', `
                • **Name:** Mongoose Database
                • **Status:** ${switchTo(connection.readyState)}
                • **Total Data:** ${totalEntries}
            `)
        const refresh = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("PRIMARY")
            .setEmoji("🔄")
            .setLabel("Refresh")
            .setCustomId("stat-refresh")
        );

        client.channels.cache.get('863118320018259998').send({
            embeds: [embed],
            components: [refresh]
        });

    }
}

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = `Disconnected`
            break;
        case 1:
            status = `Connected`
            break;
        case 2:
            status = `Connecting`
            break;
        case 3:
            status = `Disconnecting`
            break;
    }
    return status;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}