const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "server-info",
    description: "Shows server information",
    aliases: ['si'],
    /**
     *
     * @param {Client} client
     * @param {Commandmessage} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {


        const Server = message.guild;
        const members = await Server.members.fetch()
        const Owner = await message.guild.fetchOwner();
        const Tmember = members.size;
        const User = members.filter(member => !member.user.bot).size;
        const Bots = members.filter(member => member.user.bot).size;
        const Text = Server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
        const Voice = Server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
        const Category = Server.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size;
        const Stage = Server.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size;
        const Tchannel = Text + Voice + Category + Stage
        const Emoji = Server.emojis.cache.size;
        const Roles = Server.roles.cache.size;
        const RegionX = Server.region;
        const status = {
            false: "No",
            true: "Yes"
        }

        let embed1 = new MessageEmbed()
            .setAuthor({
                name: Server.name,
                iconURL: Server.iconURL({
                    dynamic: true
                }),
            })
            .setTitle('**Server Information**')
            .setColor('#2F3136')
            .setDescription(`[Server Icon](${Server.iconURL()})`)
            .setThumbnail(Server.iconURL())
            .addFields({
                name: 'Server ID:',
                value: `\`\`\`yaml\n${Server.id}\n\`\`\``,
                inline: true
            }, {
                name: 'Owner:',
                value: `\`\`\`yaml\n${Owner.user.tag}\n\`\`\``,
                inline: true
            }, {
                name: 'Boost(s):',
                value: `> No. of boost(s): **${Server.premiumSubscriptionCount}** ・ Level : **${Server.premiumTier}**`,
            }, {
                name: 'Total Members :',
                value: `> **${Tmember}** ・ **${User}** User(s) & **${Bots}** Bot(s)`,
            }, {
                name: 'Total Channel(s) :',
                value: `> **${Tchannel}** ・ **${Text}** Text channel(s), **${Voice}** Voice channel(s), **${Category}** Categories & **${Stage}** Stage(s)`,
            }, {
                name: 'Total emoji(s) :',
                value: `> **${Emoji}** Emojis`,
            }, {
                name: 'Total Role(s):',
                value: `> **${Roles}** Roles`
            }, {
                name: 'Server Creation Date :',
                value: `\`\`\`yaml\n${moment(Server.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n\`\`\``,
            })
            .addField(`Rules Channel:`, `${message.guild.rulesChannel || "None"}`, true)
            .addField(`System Channel:`, `${message.guild.systemChannel || "None"}`, true)
            .addField(`Parterned:`, `${status[Server.partnered]}`, true)
            .addField(`Verified:`, `${status[Server.verified]}`, true)

        message.reply({
            embeds: [embed1]
        })


    }
}