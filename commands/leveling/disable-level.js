const schema = require('../../models/level');
module.exports = {
    name: "disable-leveling",
    aliases: ["dlv"],
    description: "Disable Leveling System",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        schema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (data) {
                await data.delete()
                message.reply({
                    content: `${process.env.SUCCESS_EMOJI} Disabled Leveling System in this server`,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            } else if (!data) {
                message.reply({
                    content: `${process.env.FAILURE_EMOJI} Leveling System is already disabled`,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            }
        })
    }
}