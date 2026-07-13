const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "withdraw",
    description: "Withdraw money from your bank to your wallet",
    options: [
        {
            name: 'amount',
            description: 'the amount you want to withdraw',
            type: 'INTEGER',
            required: true
        }
    ],
    run: async (client, interaction, options) => {
        try {
            let money = interaction.options.getInteger('amount')
        let result = await cs.withdraw({
            user: interaction.user,        
            amount: money
        })
        let mukesh = interaction.user
        //const blackmoni = new MessageEmbed()
            //.setDescription(`${mukesh} You Can't Withdraw Negative Money!`)
            //.setColor('RED')
        const poorcookieseller = new MessageEmbed()
            .setDescription(`${mukesh} You Don't Have That Much Money In Your Bank!`)
            .setColor('RED')
        const UltraPoorCookieSeller = new MessageEmbed()
            .setDescription(`${mukesh} You Don't Have Any Money To Withdraw!`)
            .setColor('RED')
        const RichCookieSeller = new MessageEmbed()
            .setDescription(`${mukesh} You Have Succesfully Withdraw'd All Your Money!`)
            .setColor('RED')
        const GibCookie = new MessageEmbed()
            .setDescription(`${mukesh}  Have Withdrawn \`$${result.amount.toLocaleString()}\` Coins`)
            .setColor('RED')

        if (result.error) {
            //if (result.type === 'money') return interaction.followUp({
                //embeds: [cookiemoni]
            //});
            //if (result.type === 'negative-money') return interaction.followUp({
                //embeds: [blackmoni],
            //});
            if (result.type === 'low-money') return interaction.followUp({
                embeds: [poorcookieseller],
            });
            if (result.type === 'no-money') return interaction.followUp({
                embeds: [UltraPoorCookieSeller],
            });
        } else {
            if (result.type === 'all-success') return interaction.followUp({
                embeds: [RichCookieSeller],
            });
            if (result.type === 'success') return interaction.followUp({
                embeds: [GibCookie]
            })
        }
    } catch(error) {
        return interaction.followUp({
            embeds: [new MessageEmbed().setDescription(`Your Bank Has Nothing To Withdraw`).setColor('RED')],
            
        })
    }
    }
}