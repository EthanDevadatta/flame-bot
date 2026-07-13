const client = require("../index");
const {
    owners
} = require('../json/owners.json');
const premiumSchema = require('../models/premium');
const prefix = process.env.PREFIX
const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
    BaseCommandInteraction
} = require('discord.js')
const cooldownSchema = require('../models/cmdcooldown')
const prettyMilliseconds = require('pretty-ms');

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    const embed = new MessageEmbed()
        .setTitle('This is a premium command!')
        .setThumbnail('https://media.discordapp.net/attachments/847794443180048394/847800054655483904/flame_website_logo.gif')
        .setDescription('If you want premium join the support server and create a ticket! \n[Click Me](https://discord.gg/FCP2HWksBU) to join!')
        .setTimestamp()
        .setColor('#FFD700');
    const button = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Support Server')
            .setStyle('LINK')
            .setURL(process.env.SERVER_INVITE)
        )
    if (command) {

        // Premium Check
        if (command.premium && !(await premiumSchema.findOne({
                User: message.author.id
            }))) return message.channel.send({
            embeds: [embed],
            components: [button]
        });

        if (cmd.maintenance) {
            if (!owners.includes(message.author.id)) {
                return message.channel.send({
                    content: `${process.env.FAILURE_EMOJI} This command is on maintenance please try later, Thank you!`
                })
            }
        }

        // User Perms
        if (owners.includes(message.author.id)) {
            command.run(client, message, args);
            return;
        } else if (!message.member.permissions.has(command.userPermissions || [])) return message.channel.send(`${process.env.FAILURE_EMOJI} You need \`${command.userPermissions || []}\` Permissions`) // Added this

        // Bot Perms
        if (!message.guild.me.permissions.has(command.botPermissions || [])) return message.channel.send(`${process.env.FAILURE_EMOJI} I need \`${command.botPermissions || []}\` Permissions`)

        // ownerOnly
        if (command.ownerOnly) {
            if (!owners.includes(message.author.id)) {
                return message.channel.send({
                    content: `${process.env.FAILURE_EMOJI} Only the Bot Developers are allowed to run this command!`
                })
            }
        };

        // Cooldown
        if (command.timeout) {

            let cooldown;
            try {
                cooldown = await cooldownSchema.findOne({
                    userID: message.author.id,
                    commandName: command.name
                })
                if (!cooldown) {
                    cooldown = await cooldownSchema.create({
                        userID: message.author.id,
                        commandName: command.name,
                        cooldown: 0
                    })
                    cooldown.save()
                }
            } catch (e) {
                console.error(e)
            }

            if (!cooldown || command.timeout - (Date.now() - cooldown.cooldown) > 0) {
                let timecommand = prettyMilliseconds(command.timeout, {
                    verbose: true,
                    verbose: true
                })

                const timeleft = prettyMilliseconds(command.timeout - (Date.now() - cooldown.cooldown), {
                    verbose: true
                })

                let cooldownMessage = command.cooldownMsg ? command.cooldownMsg.description : `> You can use this command every **${timecommand}**!\n> Try again in: **${timeleft}** `;

                let cooldownMsg = cooldownMessage.replace("[timeleft]", `${timeleft}`).replace("[cooldown]", `${timecommand}`).replace("[user]", `${message.author.username}`)

                let cooldownEmbed = new MessageEmbed()
                    .setTitle(`${command.cooldownMsg ? command.cooldownMsg.title : "Slow Down!"}`)
                    .setDescription(cooldownMsg)
                    .setColor('#2F3136')
                return message.channel.send({
                    embeds: [cooldownEmbed]
                })
            }
        }
        const boti = new MessageActionRow().addComponents(new MessageButton().setLabel("Invite Now!").setURL(process.env.BOT_INVITE).setStyle("LINK"))
        message.channel.send({
            embeds: [new MessageEmbed().setAuthor({
                name: `${message.guild.name}`,
                iconURL: `${message.guild.iconURL()}`
            }).setDescription('>>> Try using Flame Bot\'s Slash Commands! If you dont see the Slash Commands then Please reinvite the bot using the button below').setColor("RED").setFooter({
                text: client.user.tag,
                iconURL: client.user.displayAvatarURL({
                    dynamic: true
                })
            })],
            components: [boti]
        })
        await command.run(client, message, args)
        await cooldownSchema.findOneAndUpdate({
            userID: message.author.id,
            commandName: command.name
        }, {
            cooldown: Date.now()
        })
    }
});
