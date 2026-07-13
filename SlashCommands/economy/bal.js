const {
    MessageEmbed
} = require('discord.js');
const Discord = require('discord.js')
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "balance",
    description: "Shows your wallet and bank balance",
    options: [{
        name: 'user',
        description: 'See other people balance',
        type: 'USER',
        required: false,
    }],
    run: async (client, interaction, options) => {
        const User = interaction.options.getUser('user') || interaction.user;
        let result = await cs.balance({
            user: User,
        });
        const maths = (result.bank / result.rawData.bankSpace) * 100

        const chicken = new MessageEmbed()
            .setTitle(`${User.tag}'s Balance`)
            .setDescription(`\\💳 **Wallet**: \` $${result.wallet.toLocaleString()} \`\n\\🏦 **Bank**: \` $${result.bank.toLocaleString()} / ${result.rawData.bankSpace.toLocaleString()} \` (\`${maths}%\`)`)
            .setFooter({text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({
                dynamic: true
            })})
            .setTimestamp()
            .setColor('RED')
        interaction.followUp({
            embeds: [chicken]
        });
    }
}