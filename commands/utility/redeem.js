const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const db1 = require('../../models/premium');
const db = require('../../models/keys');

module.exports = {
    name: 'redeem',
    description: 'Redeem a premium key',
    usage: '<key>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const key = args[0];
        if (!key) return message.reply('Please give a key');
        if (key.length > 9) return message.reply('That is an invalid key!');

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) return message.reply("The are no generated keys available right now!");
            let wew = data;
            if (data.keys.includes(key)) {
                db1.findOne({
                    User: message.author.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db1({
                            User: message.author.id,
                            key
                        }).save()

                        removeA(wew.keys, key)
                        wew.save();
                        const member = message.author
                        const embed = new MessageEmbed()
                            .setTitle('Congrats you have ' + process.env.BOT_NAME + ' Premium Features!')
                            .setTimestamp()
                            .setColor('GOLD')
                            .setDescription(`Congraulations on getting premium!\nJoin the [Support Server](${process.env.SERVER_INVITE}) for more benefits`)
                            .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                        member.send({
                            embeds: [embed]
                        })
                        const timestp = Math.floor(Date.now() / 1000);
                        const logchannel = client.channels.cache.get('907510489544810546')
                        const logembed = new MessageEmbed()
                            .setTitle('Key Redeemed')
                            .setDescription(`Time Redeemed: <t:${timestp}:F>`)
                            .addField('Redeemed by:', `> ${message.author.tag} \`${message.author.id}\``)
                            .addField('In Guild:', `> ${message.guild.name} \`${message.guild.id}\``)
                            .addField('Key:', `> ||\`${key}\`||`)
                            .setColor('GREEN')
                            .setTimestamp()
                            .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})

                        logchannel.send({
                            embeds: [logembed]
                        })

                        const ProGuild = client.guilds.cache.get('')
                        if (ProGuild) {
                            const role = ProGuild.roles.cache.get('');
                            message.member.roles.add(role)
                        }
                        message.reply('You have premium now! Congrats!')
                        const CurrencySystem = require('currency-system');
                        const cs = new CurrencySystem;
                        let wheretoPutMoney = "wallet";
                        let result = await cs.addMoney({
                            user: message.author,
                            amount: '100000',
                            wheretoPutMoney: wheretoPutMoney
                        });
                    } else {
                        return message.reply('You already have premium')
                    }
                })
            }
        })
    }
}

function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}