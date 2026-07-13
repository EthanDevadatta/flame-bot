const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "purge",
    description: "Purge Messages",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    options: [{
        name: 'amount',
        type: 'INTEGER',
        description: 'Amount of messages you want to purge',
        required: true,
    }, ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        let int = interaction.options.getInteger('amount');
        if (int > 100) int = 100;
        if (isNaN(int)) return interaction.followUp(`${process.env.FAILURE_EMOJI} That is not a valid number`)
        if (int < 2) return interaction.followUp(`${process.env.FAILURE_EMOJI} The number should be more that 2`)
        try {
            await interaction.deleteReply()
            const fetch = await interaction.channel.messages.fetch({
                limit: int
            });
            const deletedMessages = await interaction.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}:** ${messages}`).join('\n')}`;
            await interaction.channel.send({
                content: finalResult
            }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            interaction.followUp('An error occurred')
            return console.log(err)
        }
    }
}