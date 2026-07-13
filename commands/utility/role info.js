const {
    MessageEmbed
} = require("discord.js");

module.exports = {

    name: 'roleinfo',
    description: "Shows stats of the mentioned role",
    usage: "<role mention/role id>",
    aliases: ['rinfo', 'rolei'],
    run: async (client, message, args) => {
        if (!args[0]) return message.reply(process.env.FAILURE_EMOJI + " Please Enter A Role!")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.reply(process.env.FAILURE_EMOJI + " Please Enter A Valid Role!");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleembed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`Role Info: \`${role.name}\``)
            .addField("ID", `\`${role.id}\``)
            .addField("Name", role.name)
            .addField("Hex", role.hexColor)
            .addField("Members", `${role.members.size}`)
            .addField("Position", `${role.position}`)
            .addField("Mentionable", status[role.mentionable])
            .setFooter({
                text: message.author.tag,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()

        message.reply({
            embeds: [roleembed]
        });
    }
}