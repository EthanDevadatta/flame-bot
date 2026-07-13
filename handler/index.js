const {
    glob
} = require("glob");
const {
    promisify
} = require("util");
const {
    Client
} = require("discord.js");
const globPromise = promisify(glob);
const chalk = require('chalk')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = {
                directory,
                ...file
            };
            client.commands.set(file.name, properties);
            if (file.aliases && Array.isArray(file.aliases)) { file.aliases.forEach(alias => client.aliases.set(alias, file.name)) }

        }
    });

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.desecription;
        //if (file.userPermissions) file.defaultPermission = false;

        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // Register for a single guild 
       await client.guilds.cache.get("821972674380038164").commands.set(arrayOfSlashCommands).then(console.log(chalk.white(`✅ Successfully Registered`), chalk.red(client.slashCommands.size), chalk.white('Slash Commands in'), chalk.red(client.guilds.cache.size), chalk.white(`${client.guilds.cache.size > 1 ? "Guilds" : "Guild"}`)))

        // Register for all the guilds the bot is in
        // await client.application.commands.set(arrayOfSlashCommands).then(console.log(chalk.white(`✅ Successfully Registered`), chalk.red(client.slashCommands.size), chalk.white('Slash Commands in'), chalk.red(client.guilds.cache.size), chalk.white(`${client.guilds.cache.size > 1 ? "Guilds" : "Guild"}`)));
    });
};