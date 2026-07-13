const Levels = require('discord-xp');
const schema = require("../../models/level");

module.exports = {
    name: 'setlevel',
    aliases: ['set-level', 'level-set', 'levelset'],
    description: "Set a specific level for a user",
    usage: "<user> <level>",
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
            content: `${process.env.FAILURE_EMOJI} Please mention a user that you want to set level`,
            
        })
        if (!args[1]) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please tell which level you want to set level for that user`,
            
        })
        if (isNaN(args[1])) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Please give me a valid number!`,
            
        })
        Levels.setLevel(user, message.guild.id, xpamount)

        message.reply({
            content: `${process.env.SUCCESS_EMOJI} I have set <@${target.id}> level to ${args[1]}`,
            
        })


    }
}