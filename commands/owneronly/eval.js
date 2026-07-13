const {
    inspect
} = require("util");

const {
    MessageEmbed
} = require("discord.js")

module.exports = {
    name: 'eval',
    ownerOnly: true,
    botPerms: ["ADMINISTRATOR"],
    run: async (client, message, args) => {

        const code = args.join(" ");
        const token = process.env.TOKEN.split("").join("[^]{0,2}");
        const rev = process.env.TOKEN.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = await eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, {
                depth: 0,
                maxArrayLength: null
            });
            output = output.replace(filter, "Bot Token");
            if (output.length < 1950) {
                const outputembed = new MessageEmbed()
                    .setColor('#2F3136')
                    .setTitle(`${process.env.SUCCESS_EMOJI} Evaluation Successful`)
                    .setDescription('**Input**\n\`\`\`js\n' + code + '\`\`\`\n**Output**\n\`\`\`' + output + '\`\`\`')
                    .addField(`TypeOf`, `\`\`\`${typeof (code)}\`\`\``)
                    .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                await message.channel.send({
                    embeds: [outputembed]
                });
            }
        } catch (error) {
            const errorEmbed = new MessageEmbed()
                .setTitle(`${process.env.FAILURE_EMOJI} An Error Occurred!`)
                .setColor('RED')
                .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
                .setDescription(`\`\`\`${error}\`\`\``)
            await message.channel.send({
                embeds: [errorEmbed]
            });
        }
    }
}