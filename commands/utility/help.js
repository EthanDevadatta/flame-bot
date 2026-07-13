const {
  MessageEmbed,
  Message,
  Client,
  MessageButton,
  MessageSelectMenu,
  MessageActionRow
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const client = require('../../index')
const prefix = process.env.PREFIX; // this one gets the prefix
let color = "#2F3136"; // this is the color of the embed

const create_mh = require(`../../functions/menu.js`); // this one gets the dropdown menu

module.exports = {
  name: "help",
  aliases: [`h`],
  description: "Shows all available bot commands",
  usage: '[command/category]',
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String} args 
   * @returns 
   */
  run: async (client, message, args, Discord, db) => {

    let categories = [];
    let cots = [];

    if (!args[0]) {

      //categories to ignore
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
        serverbackup: "📥"
             }

      let ccate = [];
      //gets all the folders and commands
      readdirSync("./commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
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
          name: message.guild.name,
          iconURL: message.guild.iconURL({ dynamic: true }),
          url: process.env.BOT_WEBSITE
        })
        .setTitle(`Bot Commands`, process.env.BOT_WEBSITE)
        .setThumbnail(process.env.BOT_ICON_ANIMATED)
        .setDescription(`My prefix is \`${prefix}\`\nFor more information do \`${prefix}help <category>\` or \`${prefix}help <command>\` \n\n **__Catergories__**`)
        .addFields(categories)
        .setFooter({text:`Made by: Fire Development`, iconURL:process.env.FIRE_DEV_LOGO_ANIMATED})
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


      //creating the dropdown menu
      let menus = create_mh(ccate);
      return message.reply({
        embeds: [embed],
        components: menus.smenu
      }).then((msgg) => {
        const menuID = menus.sid;

        const select = async (interaction) => {
          if (interaction.customId != menuID) return;

          let {
            values
          } = interaction;

          let value = values[0];

          let catts = [];

          readdirSync("./commands/").forEach((dir) => {
            if (dir.toLowerCase() !== value.toLowerCase()) return;
            const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
              file.endsWith(".js")
            );


            const cmds = commands.map((command) => {
              let file = require(`../../commands/${dir}/${command}`); //getting the commands again

              if (!file.name) return "No command name.";

              let name = file.name.replace(".js", "");

              if (client.commands.get(name).hidden) return;


              let des = client.commands.get(name).description;
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

          if (cots.includes(value.toLowerCase())) {
            const combed = new MessageEmbed()
             // args[0].charAt(0).toUpperCase() + args[0].slice(1)
              .setTitle(`${value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()} Commands!`)
              .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
              .addFields(catts)
              .setColor(color)

            await interaction.deferUpdate();

            return interaction.message.edit({
              embeds: [combed],
              components: menus.smenu
            })
          };

        };

        const filter = (interaction) => {
          return !interaction.user.bot && interaction.user.id == message.author.id
        };

        const collector = msgg.createMessageComponentCollector({
          filter,
          componentType: "SELECT_MENU"
        });
        collector.on("collect", select);
        collector.on("end", () => null);

      });

    } else {
      let catts = [];

      readdirSync("./commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );


        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          if (client.commands.get(name).hidden) return;


          let des = client.commands.get(name).description;
          let emo = client.commands.get(name).emoji;
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

      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!`)
          .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
          .addFields(catts)
          .setColor(color)

        return message.reply({
          embeds: [combed]
        })
      };

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("#2F3136");
        return await message.reply({
          embeds: [embed],
          allowedMentions: {
            repliedUser: false
          },
        });
      }

      const embed = new MessageEmbed() //this is for commmand help eg. <prefix>help ping
        .setTitle("Command Details:")
        .setDescription('‎Values in `[]` are optional.\nValues in `<>` are compulsory.\n')
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases ?
          `\`${command.aliases.join("` `")}\`` :
          "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage ?
          `\`${prefix}${command.name} ${command.usage}\`` :
          `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description ?
          command.description :
          "No description for this command."
        )
        .setFooter({
          text:`Requested by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({
            dynamic: true
          })}
        )
        .setTimestamp()
        .setColor(color);
      return await message.reply({
        embeds: [embed]
      });
    }
  },
};