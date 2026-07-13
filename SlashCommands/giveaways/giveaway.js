const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Message
} = require('discord.js')
const ms = require('ms');

module.exports = {
    name: 'giveaway',
    description: 'Giveaways!',
    botPermissions: ['ADD_REACTIONS'],
    options: [{
            name: 'create',
            type: 'SUB_COMMAND',
            description: 'Create a giveaway',
            options: [{
                    name: 'duration',
                    description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'winners',
                    description: 'How many winners the giveaway should have',
                    type: 'INTEGER',
                    required: true
                },
                {
                    name: 'prize',
                    description: 'What the prize of the giveaway should be',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'channel',
                    description: 'The channel to start the giveaway in',
                    type: 'CHANNEL',
                    required: true
                },
            ],

        },
        {
            name: 'end',
            type: 'SUB_COMMAND',
            description: 'End a giveaway',
            options: [{
                name: 'giveaway',
                description: 'The giveaway to end (message ID or giveaway prize)',
                type: 'STRING',
                required: true
            }],
        },
        {
            name: 'reroll',
            type: 'SUB_COMMAND',
            description: 'Reroll a giveaway',
            options: [{
                name: 'giveaway',
                description: 'The giveaway to reroll (message ID or prize)',
                type: 'STRING',
                required: true
            }],
        },
    ],
    run: async (client, interaction, args) => {
        const [SubCommand] = args;
        if (!interaction.member.roles.cache.some((r) => r.name === 'Giveaways')) {
            return interaction.followUp(`You need to have the 'Giveaways' role to do that.`);
        }

        if (SubCommand === "create") {
            const giveawayChannel = interaction.options.getChannel('channel');
            const giveawayDuration = interaction.options.getString('duration');
            const giveawayWinnerCount = interaction.options.getInteger('winners');
            const giveawayPrize = interaction.options.getString('prize');

            if (!giveawayChannel.isText()) {
                return interaction.reply({
                    content: ':x: Selected channel is not text-based.',
                    ephemeral: true
                });
            }
            const entrants = new MessageEmbed()
                .setColor('RED')
            .setDescription('**{this.message.reactions.cache.get(this.reaction).count - 1}** [Entrants]({this.messageURL}) ')
            // Start the giveaway
            client.giveawaysManager.start(giveawayChannel, {
                // The giveaway duration
                duration: ms(giveawayDuration),
                // The giveaway prize
                prize: giveawayPrize,
                // The giveaway winner count
                winnerCount: giveawayWinnerCount,
                // Who hosts this giveaway
                hostedBy: true ? interaction.user : null,
                // Messages
                messages: {
                    giveaway: (false ? "@everyone\n\n" : "") + "🎉" + " **GIVEAWAY** " + "🎉",
                    giveawayEnded: (false ? "@everyone\n\n" : "") + "🎉" + "** GIVEAWAY ENDED **" + "🎉",
                    timeRemaining: "Time remaining: **{duration}**!",
                    inviteToParticipate: "React with 🎉 to participate!",
                    winMessage: { content: `Congratulations {winners}! You Won The **{this.prize}!**`, embed: entrants },
                    embedFooter: '{this.winnerCount} winner(s)',
                    drawing: 'Ending: {timestamp}',
                    inviteToParticipate: 'React with 🎉 to participate!',
                    noWinner: "Giveaway cancelled, no valid participations.",
                    hostedBy: 'Hosted by: {this.hostedBy}',
                    winners: "Winner(s)",
                    endedAt: "Ended at",
                    units: {
                        seconds: "seconds",
                        minutes: "minutes",
                        hours: "hours",
                        days: "days",
                        pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                    }
                }
            });

            interaction.followUp(`🎉 Giveaway started in ${giveawayChannel}!`);


        } else if (SubCommand === "end") {
            const query = interaction.options.getString('giveaway');

            // try to found the giveaway with prize then with ID
            const giveaway =
                // Search with giveaway prize
                client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
                // Search with giveaway ID
                client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

            // If no giveaway was found
            if (!giveaway) {
                return interaction.reply({
                    content: 'Unable to find a giveaway for `' + query + '`.',
                    ephemeral: true
                });
            }

            if (giveaway.ended) {
                return interaction.reply({
                    content: 'This giveaway is already ended.',
                    ephemeral: true
                });
            }

            // Edit the giveaway
            client.giveawaysManager.end(giveaway.messageId)
                // Success message
                .then(() => {
                    // Success message
                    interaction.reply('Giveaway ended!');
                })
                .catch((e) => {
                    interaction.followUp({
                        content: e,
                        ephemeral: true
                    });
                });
        } else if (SubCommand === "reroll") {
            const query = interaction.options.getString('giveaway');

            // try to found the giveaway with prize then with ID
            const giveaway =
                // Search with giveaway prize
                client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
                // Search with giveaway ID
                client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

            // If no giveaway was found
            if (!giveaway) {
                return interaction.reply({
                    content: 'Unable to find a giveaway for `' + query + '`.',
                    ephemeral: true
                });
            }

            if (!giveaway.ended) {
                return interaction.reply({
                    content: 'The giveaway is not ended yet.',
                    ephemeral: true
                });
            }

            // Reroll the giveaway
            client.giveawaysManager.reroll(giveaway.messageId)
                .then(() => {
                    // Success message
                    interaction.followUp('Giveaway rerolled!');
                })
                .catch((e) => {
                    interaction.followUp({
                        content: e,
                        ephemeral: true
                    });
                });

        }
    }
}