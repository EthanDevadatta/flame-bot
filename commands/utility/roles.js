const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: "roles",
    description: "See all the roles in this server",
    usage: '[role]',
    run: async (client, message, args) => {
        const role =
            message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) {
            const roles =
                message.guild.roles.cache
                .filter((r) => r.id !== message.guild.id)
                .map((r) => r)
                .join(",\n") || "None";

            const embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s Roles`)
                .setDescription(
                    `${roles.length > 2048 ? roles.slice(0, 2030) + "..." : roles}`
                )
                .setTimestamp()
                .setFooter({
                    text: message.author.tag,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setColor("RED");

            message.reply({
                embeds: [embed]
            });
        } else {
            const members = await message.guild.members.fetch()
            let membersWithRole = members
                .filter((member) => {

                    return member.roles.cache.find((r) => r.name === role.name);
                })
                .map((member) => {
                    return member.user.tag;
                });
            if (membersWithRole > 2048)
                return message.channel.send("**List Is Too Long!**");

            let roleEmbed = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(message.guild.iconURL())
                .setTitle(`Users With The ${role.name} Role!`)
                .setDescription(membersWithRole.join("\n"));
            message.channel.send({
                embeds: [roleEmbed]
            });
        }
    },
};