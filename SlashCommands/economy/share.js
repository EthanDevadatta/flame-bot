const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "share",
    description: "Share money to a User",
    options: [
        {
            name: 'member',
            description: 'The User You Want To Share The Money With',
            type: 'USER',
            required: true
        },
        {
            name: 'amount',
            description: 'Amount For Sharing',
            type: 'INTEGER',
            required: true
        }
    ],
    run: async (client, interaction, options) => {
        const CurrencySystem = require("currency-system");
        const cs = new CurrencySystem;

        let user = interaction.options.getUser('member')

        if (user.id === interaction.user.id) return interaction.followUp(process.env.FAILURE_EMOJI + `You can't transfer money to yourself!`);


        if (user.bot) return interaction.followUp(process.env.FAILURE_EMOJI + "Why u want to give your cash to a bot!?")

            if (user === client.user) return interaction.followUp(process.env.FAILURE_EMOJI + " Why u want to give your cash to a bot!?");
    
            let amount = interaction.options.getInteger('amount')
            if(isNaN(amount)) return interaction.followUp(process.env.FAILURE_EMOJI + " Only Numbers Are Allowed")
            let money = parseInt(amount);
    
            let result = await cs.transferMoney({
                user: interaction.user,
                user2: user,
                amount: money
            });
            if (result.error) return interaction.followUp(process.env.FAILURE_EMOJI + `You don't have enough money in your wallet.`);
            else {
                const embed = new MessageEmbed()
                    .setDescription(`${process.env.SUCCESS_EMOJI} ${interaction.user.username}, Successfully transfered \` $${result.money.toLocaleString()} \` to **${result.user2.username}**`)
                    .setColor('GREEN')
                    interaction.followUp({
                    embeds: [embed]
                })
        }
    }
}