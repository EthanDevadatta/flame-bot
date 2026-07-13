const Discord = require('discord.js');
const Levels = require('discord-xp')
const canvacord = require('canvacord')
const schema = require("../../models/level");
module.exports = {
    name: 'rank',
    description: "Shows your rank!",
    usage: "[user]",
    
    botPermissions: ['ATTACH_FILES'],
    run: async (client, message, args) => {
        const data = await schema.findOne({
            Guild: message.guild.id
        });
        if (!data) return message.reply({
            content: `${process.env.FAILURE_EMOJI} Leveling System hasn't been enabled on this server. To enable it run the following command: \`${process.env.PREFIX}enable-leveling\``,
            
        });
        const target = message.mentions.users.first() || message.author
        let memberTarget = message.guild.members.cache.get(target.id);
        const user = await Levels.fetch(target.id, message.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (user.length < 1) return message.reply({
            content: `${process.env.FAILURE_EMOJI} You Dont have xp, try sending messages!`,
            
        })
        message.channel.send('<a:circle_loading:906770677514784779>').then(rankMessage => {
            const bg = [
                'https://media.discordapp.net/attachments/796358841038143488/800327636177387540/unknown.png',
                'https://media.discordapp.net/attachments/796358841038143488/800327698648006696/unknown.png',
                'https://media.discordapp.net/attachments/796358841038143488/800335671663263744/unknown.png',
                'https://media.discordapp.net/attachments/796358841038143488/799915767331160074/rankcard_1.png',
                'https://media.discordapp.net/attachments/796358841038143488/800339270610976799/unknown.png',
                'https://media.discordapp.net/attachments/796358841038143488/800339813210259506/unknown.png',
                'https://media.discordapp.net/attachments/796358841038143488/800342766957494282/unknown.png',
                'https://media.discordapp.net/attachments/837717115506130987/864723594725556254/508948.jpg?width=1178&height=662',
                'https://media.discordapp.net/attachments/837717115506130987/864723598040104990/508954.png?width=1178&height=662',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723600330194984/BG_MiamiDome.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723603862061056/BG_Steam.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723604981678081/bugatti-noire-neon-art-w9-1366x768.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723605699297300/music-stars-planet-space-wallpaper.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723608018223125/BG_Synthwave.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723610714636319/wp2494990.jpg',
                'https://cdn.discordapp.com/attachments/837717115506130987/864723637193801778/wp2343928.jpg',
                'https://media.discordapp.net/attachments/821972674380038166/906576589691682896/gradient-liquid-abstract-background_52683-60469.png',
                'https://media.discordapp.net/attachments/821972674380038166/906576753231822899/pngtree-dark-vector-abstract-background-image_302715.png',

            ]
            const Randomrate = Math.floor(Math.random() * bg.length)
            const rank = new canvacord.Rank()
                .setAvatar(memberTarget.user.displayAvatarURL({
                    dynamic: false,
                    format: 'png'
                }))
                .setCurrentXP(user.xp)
                .setLevel(user.level || 0)
                .setRequiredXP(neededXp)
                .setRank(user.position)
                .setStatus('online')
                .setProgressBar('#FF0000', 'COLOR')
                .setBackground('IMAGE', bg[Randomrate])
                .setUsername(memberTarget.user.username)
                .setDiscriminator(memberTarget.user.discriminator);

            rank.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "rankcard.png");
                    rankMessage.delete()
                    message.reply({
                        files: [attachment],
                        allowedMentions: {
                            repliedUser: false
                        }
                    });
                });
        })
    }
}