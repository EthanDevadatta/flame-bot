const client = require("../index");
const Schema = require("../models/premium");

client.on("guildMemberAdd", async member => {

    Schema.findOne({
        User: member.id
    }, async (err, data) => {
        if (!data) return
        const ProGuild = client.guilds.cache.get('')
        if (data && member.guild.id === ProGuild.id) {
            const role = ProGuild.roles.cache.get('');
            member.roles.add(role)
        } else {
            return
        }
    })
})