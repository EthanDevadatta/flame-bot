const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    Message
} = require("discord.js")
const Levels = require('discord-xp')

module.exports = {
    name: "leaderboard",
    description: "Shows the leaderboard for the selected option!",
    run: async (client, interaction, args) => {

        const lb = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("cookie_lb")
                .setPlaceholder("Choose A Leaderboard To View")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([{
                        label: 'Thank Leaderboard',
                        description: 'View Thank Leaderboard',
                        value: 'thanklb',
                    }, {
                        label: 'Message Leaderboard',
                        description: 'View Message Leaderboard',
                        value: 'messagelb',
                    },
                    {
                        label: 'Economy Leaderboard',
                        description: 'View Economy Leaderboard',
                        value: 'gelb',
                    },
                ])
            )
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setThumbnail('https://media.discordapp.net/attachments/821972674380038166/907273818450591764/Leaderboard-blog.png')
            .setTitle('Leaderboard Options')
            .setTimestamp()
            .setAuthor({
                name: interaction.guild.name,
                iconURL: interaction.guild.iconURL({
                    dynamic: true
                })
            })
            .setFooter({
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setDescription(`Select a leaderboard you want to view:\n\n> Thank Leaderboard\n> Message Leaderboard\n > Global Economy Leaderboard`)

        interaction.followUp({
            embeds: [embed],
            components: [lb],

        })

        const collector = await interaction.channel.createMessageComponentCollector({
            time: 15000,
            componentType: "SELECT_MENU",
        })


        collector.on("collect", async (i) => {

            if (i.customId === 'cookie_lb') {

                const gg = i.values[0]

                if (i.user.id !== interaction.user.id) return i.reply({
                    content: "Please dont use others peoples drowp down menu!",
                    ephemeral: true
                })

                if (gg === 'thanklb') {
                    const lead = require('../../models/thank')
                    lead.find()

                    let data = await lead.find({
                        guildId: interaction.guild.id
                    })

                    data = data.sort((a, b) => b.received - a.received)
                    // await i.deferUpdate();
                    if (!data || data.length === 0) return i.update("Looks like nobody has thanked anyone!")
                    const embed = new MessageEmbed()
                        .setFooter({
                            text: i.user.username,
                            iconURL: i.user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setTitle('Thank\'s Reputation\n')
                        .setColor('#00ff88')
                        .setTimestamp()
                        .setAuthor({
                            name: i.guild.name,
                            iconURL: i.guild.iconURL({
                                dynamic: true
                            }),
                            url: process.env.BOT_WEBSITE
                        })
                    for (let i = 0; i < 10; i++) {
                        if (!data[i]) break;
                        data[i].userID
                        const user = await client.users.fetch(data[i].userId)
                        //console.log(data[i].userId)
                        embed.addField(`\n${i + 1}. ` + `${user.tag}`, "Received: " + `\`${data[i].received}\``)
                    }

                    i.update({
                        embeds: [embed],
                    })
                } else if (gg === 'messagelb') {
                    const Levels = require('discord-xp');

                    const schema = require("../../models/level");
                    const data = await schema.findOne({
                        Guild: interaction.guild.id
                    });
                    ////await interaction.deferUpdate();
                    if (!data) return i.update(`${process.env.FAILURE_EMOJI} Leveling System is not enabled`);
                    const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 5);
                    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)
                    if (rawLeaderboard.length < 1) return i.update(`${process.env.FAILURE_EMOJI} Nobody's in leaderboard yet`);

                    // i.update('<a:circle_loading:906770677514784779>').then(lbMessage => {
                    const lb = leaderboard.map(e => `**${e.position}.** **${e.username}#${e.discriminator}**\nLevel: \`${e.level}\`\nXP: \`${e.xp.toLocaleString()}\``);
                    const msgembed = new MessageEmbed()
                        .setFooter({
                            text: i.user.username,
                            iconURL: i.user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setTitle('Message Leaderboard\n')
                        .setColor('#00ff88')
                        .setTimestamp()
                        .setAuthor({
                            name: i.guild.name,
                            iconURL: i.guild.iconURL({
                                dynamic: true
                            }),
                            url: process.env.BOT_WEBSITE
                        })
                        .setDescription(`${lb.join("\n\n")}`)

                    i.update({
                        embeds: [msgembed]
                    })
                } else if (gg === 'gelb') {
                    const CurrencySystem = require("currency-system");
                    const cs = new CurrencySystem;
                    let data = await cs.globalLeaderboard();
                    //await interaction.deferUpdate();
                    if (data.length < 1) return i.update(`${process.env.FAILURE_EMOJI} Nobody's in leaderboard yet`);
                    const geembed = new MessageEmbed()
                        .setFooter({
                            text: i.user.username,
                            iconURL: i.user.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setTitle('Economy Leaderboard\n')
                        .setColor('#00ff88')
                        .setTimestamp()
                        .setAuthor({
                            name: i.guild.name,
                            iconURL: i.guild.iconURL({
                                dynamic: true
                            }),
                            url: process.env.BOT_WEBSITE
                        })
                    let pos = 0;
                    // To make global leaderboard show members
                    // of current guild only, un comment the next line.

                    // data = data.filter(e => message.guild.members.cache.has(e.userID));

                    // This is to get First 10 Users )
                    data.slice(0, 10).map(e => {
                        pos++
                        if (!client.users.cache.get(e.userID)) return;
                        //msg.addField(`${pos} - **${client.users.cache.get(e.userID).username}**`, `Wallet: **${e.wallet}** - Bank: **${e.bank}**`, true);
                        geembed.addField(`**${pos}.** **${client.users.cache.get(e.userID).tag}**`, `Wallet: \`$${e.wallet.toLocaleString()}\`\nBank: \`$${e.bank.toLocaleString()}\``);
                    });

                    i.update({
                        embeds: [geembed]
                    }).catch();
                }

            }

        })
    }
}