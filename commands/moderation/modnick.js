const {
    Client,
    Message,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "modnick",
    aliases: ["moderate-nick"],
    description: "Change unmentionable name to something mentionable!",
    usage: '<member>',
    userPermissions: ["MANAGE_NICKNAMES"],
    botPermissions: ["MANAGE_NICKNAMES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        if (!member)
            return message.channel.send("Please mention member to moderate nickname!");

        function generatenick() {
            var length = 7,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            return retVal;
        }

        let modnick = generatenick();
        member.setNickname(`Moderated Nickname ${modnick}`);
        message.channel.send('Moderated the User!')
    },
};