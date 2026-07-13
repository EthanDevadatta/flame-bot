const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "lock",
    description: "Locks a channel",
    options: [{
        name: "state",
        description: "Lock on or off",
        type: "STRING",
        required: true,
        choices: [ {
            name: 'on',
            value: 'on',
        }, {
            name: 'off',
            value: 'off',
        }],
    }, {
        name: "channel",
        description: "The channel you want to (un-)lock",
        required: true,
        type: "CHANNEL",
        channelTypes: ['GUILD_TEXT'],
    }, {
        name: "role",
        description: "The role which can't type in the channel",
        required: false,
        type: "ROLE"
    }],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, interaction) => {
        const cross = process.env.FAILURE_EMOJI

        const state = interaction.options.getString("state");
        const channel = interaction.options.getChannel("channel");
        if (!channel.type === "GUILD_TEXT") return await interaction.followUp({
            content: `${cross} that channel is not a text channel.`
        })
        let role = interaction.options.getRole("role") || channel.guild.roles.everyone;

        const sendMessages = channel.permissionsFor(role).has("SEND_MESSAGES")

        if (state === "on" && sendMessages === true) {
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: false
            }).then(channel.permissionOverwrites.edit(interaction.user.id, {
                SEND_MESSAGES: true,
            })).then(channel.permissionOverwrites.edit(client.user.id, {
                SEND_MESSAGES: true,
            }))

            const embed = new MessageEmbed()
                .setColor("RED")
                .setAuthor({
                    name: `Channel Locked by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({dynamic: true})
                })
                .setDescription(`Locked ${channel} for ${role}`)

            interaction.followUp({
                embeds: [embed]
            })
        } else if (state === "off" && sendMessages === false) {
            await channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: null
            })

            const embed = new MessageEmbed()
                .setColor("RED")
                .setAuthor({
                    name: `Channel Locked by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setDescription(`Unlocked ${channel} for ${role}`)

            interaction.followUp({
                embeds: [embed]
            })
        } else {
            return interaction.followUp({
                content: `${cross} that is not a valid state. please use \`on\` / \`off\` or check the role's \`SEND_MESSAGES\` permission for that channel`
            })
        }
    }
}