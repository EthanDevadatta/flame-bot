const {
    MessageEmbed,
    CommandInteraction,
    Client,
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const prefix = '/'; // this one gets the prefix
let color = "#2F3136";
const create_mh = require("../../functions/menu");

module.exports = {
    name: "help",
    description: "Shows all available bot commands",
    options: [{
        name: "category",
        description: "The category you want help on",
        type: "STRING",
        choices: [{
            name: "Utility",
            value: "Utility"
        }, {
            name: "Moderation",
            value: "Moderation"
        }, {
            name: "Economy",
            value: "Economy"
        }, {
            name: "Leveling",
            value: "Leveling"
        }, {
            name: "Configuration",
            value: "Configuration"
        }, {
            name: "Giveaways",
            value: "Giveaways"
        }, {
            name: "Emojimanager",
            value: "Emojimanager"
        }, {
            name: "Serverbackup",
            value: "Serverbackup"
        }, {
            name: "Reactionroles",
            value: "Reactionroles"
        }],
        required: false,
    }, {
        name: "command",
        description: "The command you want information on",
        type: "STRING",
        required: false
    }],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const option = interaction.options.getString("category")
        const command = interaction.options.getString("command")

        let categories = [];
        let cots = [];
        if (!option && !command) {
            let ignored = [
                "owneronly"
            ];

            const emo = {
                utility: "🛠️",
                moderation: "🛡️",
                economy: "🪙",
                leveling: "💬",
                configuration: "⚙️",
                giveaways: "🎉",
                emojimanager: "🙃",
                serverbackup: "📥",
                reactionroles: "️️️🎗",
                suggestionsystem: "⬆️",
                configuration: "️⛮",
                fun: "🎮"
            }

            let ccate = [];

            readdirSync("./SlashCommands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );

                if (ignored.includes(dir.toLowerCase())) return;

                const name = `${emo[dir]}・${dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase()}`;
                //let nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
                let nome = dir.toUpperCase();

                let cats = new Object();

                //this is how it will be created as
                cats = {
                    name: name,
                    value: `\`${prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                ccate.push(nome);
            });

            const embed = new MessageEmbed()
                .setAuthor({
                    name: interaction.guild.name,
                    iconURL: interaction.guild.iconURL({
                        dynamic: true
                    }),
                    url: process.env.BOT_WEBSITE
                })
                .setTitle(`Bot Commands`, process.env.BOT_WEBSITE)
                .setThumbnail(process.env.BOT_ICON_ANIMATED)
                .setDescription(`My prefix is \`${prefix}\`\nFor more information do \`${prefix}help <category>\` or \`${prefix}help <command>\` \n\n **__Catergories__**`)
                .addFields(categories)
                .setFooter({
                    text: `Made by: Fire Development`,
                    iconURL: process.env.FIRE_DEV_LOGO_ANIMATED
                })
                .setTimestamp()
                .setColor(color)
                .addFields({
                    name: '\u200c',
                    value: '\u200B'
                }, {
                    name: "\u200c",
                    value: ("<:invite:821424343867195433> [Invite](https://discord.com/api/oauth2/authorize?client_id=796279185080582185&permissions=536870911991&redirect_uri=https%3A%2F%2Fdiscord.gg%2FFCP2HWksBU&response_type=code&scope=applications.commands%20bot%20guilds.join) `|` <:discord_staff:814491281832804416> [Support Server](https://discord.gg/FCP2HWksBU) `|` <:upvote:821390316195676171> [Vote](https://top.gg/bot/796279185080582185) `|` <:public:814491294142824449> [Webpage](https://flamebot.gq)"),
                    inline: true
                }, )

            let menus = create_mh(ccate);
            return await interaction.editReply({
                embeds: [embed]
            }).then(async (msgg) => {
                const select = async (interaction) => {
                    if (interaction.customId != menuID) return;

                    let {
                        values
                    } = interaction;

                    let value = values[0];

                    let catts = [];

                    readdirSync("./SlashCommands/").forEach((dir) => {
                        if (dir.toLowerCase() !== value.toLowerCase()) return;
                        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                            file.endsWith(".js")
                        );


                        const cmds = commands.map((command) => {
                            let file = require(`../../SlashCommands/${dir}/${command}`); //getting the commands again

                            if (!file.name) return "No command name.";

                            let name = file.name.replace(".js", "");

                            if (client.slashCommands.get(name).hidden) return;


                            let des = client.slashCommands.get(name).description;

                            let obj = {
                                cname: `> \`${name}\``,
                                des
                            }

                            return obj;
                        });

                        let dota = new Object();

                        cmds.map(co => {
                            if (co == undefined) return;

                            dota = {
                                name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                                value: co.des ? co.des : `No Description`,
                                inline: true,
                            }
                            catts.push(dota)
                        });

                        cots.push(dir.toLowerCase());
                    });
                    if (cots.includes(value.toLowerCase())) {
                        const combed = new MessageEmbed()
                            // args[0].charAt(0).toUpperCase() + args[0].slice(1)
                            .setTitle(`${value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()} Commands!`)
                            .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                            .addFields(catts)
                            .setColor(color)

                        await interaction.update({
                            embeds: [combed]
                        })
                    };

                    const filter = (i) => {
                        return !i.user.bot && i.user.id == interaction.user.id
                    };

                    const collector = msgg.createMessageComponentCollector({
                        filter,
                        componentType: "SELECT_MENU"
                    });

                    collector.on("collect", select);
                    collector.on("end", () => null);
                }
            });
        } else if (option && !command) {
            let catts = [];

            readdirSync("./SlashCommands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../SlashCommands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    if (client.slashCommands.get(name)?.hidden) return;


                    let des = client.slashCommands.get(name).description;
                    let emo = client.slashCommands.get(name).emoji;
                    let emoe = emo ? `${emo} - ` : ``;

                    let obj = {
                        cname: `> \`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    if (co == undefined) return;

                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : `No Description`,
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            if (cots.includes(option.toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`${option[0].toUpperCase() + option.slice(1)} Commands!`)
                    .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return interaction.editReply({
                    embeds: [combed]
                })
            };
        } else if (command && !option) {
            const cmd =
                client.slashCommands.get(command.toLowerCase())

            if (!cmd) return interaction.editReply({
                embeds: [{
                    color: "#2f3136",
                    description: `No results found for \`${command.toLowerCase()}\``
                }]
            });

            const embed = new MessageEmbed().setColor(color).setAuthor({
                name: `${command} Command`,
                iconURL: client.user.displayAvatarURL()
            }).addField("Name", `${cmd.name}`).addField("Description", `${cmd.description}`).addField("Options", `${cmd.options ? cmd.options?.map((option) => `\`${option.name}\``) : "None"}`)
            return interaction.editReply({
                embeds: [embed]
            })
        } else if (command && option) return interaction.editReply({
            embeds: [{
                color: "#2f3136",
                description: "Please select one option"
            }]
        })
    }
}