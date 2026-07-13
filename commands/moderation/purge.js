module.exports = {
    name: 'purge',
    description: 'Purge messages',
    usage: '<number of messages to delete>',
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    aliases: ['clear'],
    run: async (client, message, args) => {
        let int = args[0];
        if (int > 100) int = 100;
        if (isNaN(int)) return message.reply(`${process.env.FAILURE_EMOJI} That is not a valid number`)
        if (int < 2) return message.reply(`${process.env.FAILURE_EMOJI} The number should be more that 2`)
        try {
            await message.delete()
            const fetch = await message.channel.messages.fetch({
                limit: int
            });
            const deletedMessages = await message.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}:** ${messages}`).join('\n')}`;
            await message.channel.send({
                content: finalResult
            }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            message.channel.send('An error occurred')
            return console.log(err)
        }
    }
}