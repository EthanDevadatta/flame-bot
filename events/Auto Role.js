const schema = require('../models/Auto Role');
const client = require('../index');

client.on("guildMemberAdd", async (member, guild) => {
    schema.findOne({
        guild: member.guild.id
    }, async (err, data) => {
        if (!data) return;
        if (data) {
            const joinrole = member.guild.roles.cache.find(role => role.id == data.role);
            if (!joinrole) {
                return data.delete();
            }
            member.roles.add(joinrole.id)
        }
    })
})