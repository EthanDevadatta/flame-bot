const {
    MessageEmbed
} = require("discord.js");

module.exports = {

    name: 'roleinfo',
    description: "Shows stats of the mentioned role",
    options: [{
        name: 'role',
        type: 'ROLE',
        description: 'The role that you want to get information about',
        required: true,
    }, ],
    run: async (client, interaction, args) => {
        let role = interaction.options.getRole('role')

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
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()

        interaction.followUp({
            embeds: [roleembed]
        });
    }
}