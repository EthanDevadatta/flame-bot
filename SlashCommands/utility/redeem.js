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
    options: [{
        name: 'premium-key',
        type: 'STRING',
        description: 'Premium Key you want to redeem',
        required: true,
    }, ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const key = args[0];
        if (!key) return interaction.followUp('Please give a key');
        if (key.length > 9) return interaction.followUp('That is an invalid key!');

        db.findOne({
            client: client.user.id
        }, async (err, data) => {
            if (!data) return interaction.followUp("The are no generated keys available right now!");
            let wew = data;
            if (data.keys.includes(key)) {
                db1.findOne({
                    User: interaction.user.id
                }, async (err, data) => {
                    if (!data) {
                        data = new db1({
                            User: interaction.user.id,
                            key
                        }).save()

                        removeA(wew.keys, key)
                        wew.save();
                        const member = interaction.user
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
                            .addField('Redeemed by:', `> ${interaction.user.tag} \`${interaction.user.id}\``)
                            .addField('In Guild:', `> ${interaction.guild.name} \`${interaction.guild.id}\``)
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
                            interaction.member.roles.add(role)
                        }
                        const CurrencySystem = require('currency-system');
                        const cs = new CurrencySystem;
                        let wheretoPutMoney = "wallet";
                        let result = await cs.addMoney({
                            user: interaction.user,
                            amount: '100000',
                            wheretoPutMoney: wheretoPutMoney
                        });
                        interaction.followUp('You have premium now! Congrats!')
                    } else {
                        return interaction.followUp('You already have premium')
                    }
                })
            } else interaction.followUp('Invalid Key')
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