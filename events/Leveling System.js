const levelSchema = require("../models/level");
const Levels = require('discord-xp')
Levels.setURL(process.env.MONGO_STRING)
const client = require('../index')

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    levelSchema.findOne({
            Guild: message.guild.id
        },
        async (err, data) => {
            if (!data) return;
            const randomXp = Math.floor(Math.random() * 12) + 1;
            const hasLeveledUp = await Levels.appendXp(
                message.author.id,
                message.guild.id,
                randomXp
            );
            if (hasLeveledUp) {
                const user = await Levels.fetch(message.author.id, message.guild.id);
                message.channel
                    .send(
                        `Congrats **${message.author.tag}**!, You just leveled up to level \`${user.level}\`!`
                    )
            }
        }
    );

})