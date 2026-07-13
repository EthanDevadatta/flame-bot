const Levels = require('discord-xp')
const schema = require("../../models/level");

module.exports = {
    name: 'removexp',
    aliases: ['remove-xp', 'xp-remove', 'xpremove'],
    description: "Remove xp from a user",
    usage: "<user> <xp amount>",
    userPermissions: ['MANAGE_MESSAGES'],
    premium: true,
    run: async (client, message, args) => {
        const data = await schema.findOne({
            Guild: message.guild.id
        });
        const xpamount = args[1]
        const target = message.mentions.members.first()
        const user = (target.id);

        if (!data) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Leveling System hasn't been enabled on this server. To enable it run the following command: \`${process.env.PREFIX}enable-leveling\``,
            
        });
        if (!args[0]) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please mention a user that you want to remove xp`,
            
        })
        if (!args[1]) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please tell the amount of xp to remove!`,
            
        })
        if (isNaN(args[1])) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please give me a valid number!`,
            
        })
        Levels.subtractXp(user, message.guild.id, xpamount)
        message.reply({
            content: `${process.env.SUCCESS_EMOJI} I have removed ${args[1]} xp from <@${target.id}>`,
        })

    }
}