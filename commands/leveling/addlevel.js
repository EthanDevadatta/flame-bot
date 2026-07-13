const Levels = require('discord-xp')
const schema = require("../../models/level");

module.exports = {
    name: 'addlevel',
    aliases: ['add-level', 'level-add', 'leveladd'],
    description: "Add level(s) to a user",
    usage: "<user> <level(s)>",
    premium: true,
    userPermissions: ['MANAGE_MESSAGES'],
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
            content: `${process.env.FAILURE_EMOJI} Please mention a user that you want to give level(s)`,
            
        })
        if (!args[1]) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please tell the amount of level(s) to add!`,
            
        })
        if (isNaN(args[1])) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please give me a valid number!`,
            
        })
        Levels.appendLevel(user, message.guild.id, xpamount)

        message.reply({
            content: `${process.env.SUCCESS_EMOJI} I have added ${args[1]} level(s) to <@${target.id}>`,
            
        })


    }
}