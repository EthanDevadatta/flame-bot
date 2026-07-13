require('dotenv').config()
const {
    Collection,
    Client
} = require('discord.js');
const path = require('path');
const fs = require('fs');
const {
    DiscordTogether
} = require('discord-together');


// Defining my Client
const client = new Client({
    allowedMentions: {
        repliedUser: false,
        parse: ['users']
    },
    intents: 32511,
    // Mobile Status

    // ws: {
    //     properties: {
    //         $browser: "Discord Android"
    //     }
    // }
});
module.exports = client;

// Currency System Configuration
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
cs.setMongoURL(process.env.MONGO_STRING, false);
cs.setDefaultWalletAmount('100');
cs.setDefaultBankAmount('200');
cs.setDefaultBankLimitForUser(1000);

// Giveaway System Configuration
const {
    GiveawaysManager
} = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
    storage: './json/giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: 'BLUE',
        embedColorEnd: 'RED',
        reaction: '🎉',
        lastChance: {
            enabled: true,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
        }
    }
});

// Global variables
client.commands = new Collection();
client.prefix = process.env.PREFIX;
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('commands'));
client.discordTogether = new DiscordTogether(client);
client.giveawaysManager = manager;

// Requiring the Handler
require('./handler')(client);

// Logging into the client
client.login(process.env.TOKEN);
