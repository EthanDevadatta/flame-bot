const schema = require("../../models/level");
module.exports = {
    name: "enable-leveling",
    aliases: ["elv"],
    description: "Enable Leveling System",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        schema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (!data) {
                new schema({
                    Guild: message.guild.id,
                }).save();
                message.reply({
                    content: `${process.env.SUCCESS_EMOJI} Enabled Leveling System`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            } else if (data) {
                message.reply({
                    content: `${process.env.FAILURE_EMOJI} Leveling System is enabled already`,
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }
        });
    },
};