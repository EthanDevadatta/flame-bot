const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    name: "roles",
    description: "See all the roles in this server",
    options: [{
        name: 'role',
        type: 'ROLE',
        description: 'Shows all the members  with the given role',
        required: false,
    }, ],
    run: async (client, interaction, args) => {
        const role = interaction.options.getRole('role')
        if (!role) {
            const roles =
                interaction.guild.roles.cache
                .filter((r) => r.id !== interaction.guild.id)
                .map((r) => r)
                .join(",\n") || "None";

            const embed = new MessageEmbed()
                .setTitle(`${interaction.guild.name}'s Roles`)
                .setDescription(
                    `${roles.length > 2048 ? roles.slice(0, 2030) + "..." : roles}`
                )
                .setTimestamp()
                .setFooter({
                    text: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setColor("RED");

            interaction.followUp({
                embeds: [embed]
            });
        } else {
            const members = await interaction.guild.members.fetch()
            let membersWithRole = members
                .filter((member) => {

                    return member.roles.cache.find((r) => r.name === role.name);
                })
                .map((member) => {
                    return member.user.tag;
                });
            if (membersWithRole > 2048)
                return interaction.followUp("**List Is Too Long!**");

            let roleEmbed = new MessageEmbed()
                .setColor("RED")
                .setThumbnail(interaction.guild.iconURL())
                .setTitle(`Users With The ${role.name} Role!`)
                .setDescription(membersWithRole.join("\n"));
            interaction.followUp({
                embeds: [roleEmbed]
            });
        }
    },
};