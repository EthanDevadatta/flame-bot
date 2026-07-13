const {
    MessageEmbed
} = require("discord.js")
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

module.exports = {
    name: "beg",
    description: "Beg and earn coins",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let result = await cs.beg({
            user: message.author,
            minAmount: 100,
            maxAmount: 300,
        })
        const replies = [
            `**BiizoNinja** Donated $ **${result.amount}**!`,
            `**James Charles** Donated $ **${result.amount}**!`,
            `**Selena Gomez** Donated $ **${result.amount}**!`,
            `**Your Granny** Donated $ **${result.amount}**!`,
            `**Broken Tooth** Donated $ ${result.amount}!`,
            `**THE GOD HIMSELF!** Donated $ **${result.amount}**!`,
            `**Hackerboi 69** Donated $ **${result.amount}**!`,
            `**FiredragonPlayz** Donated $ **${result.amount}**!`,
            `**mallusrgreatv2** Donated $ **${result.amount}**!`,
            `**Pewdiepie** Donated $ **${result.amount}**!`,
            `**Mr.Beast** Donated $ **${result.amount}**!`,
            `**Your Mom** Donated $ **${result.amount}**!`,
            `**The kekw guy** Donated $ **${result.amount}**`,
            `**Spider Man** Stop asking me for coins`,
            `**Queen Elizabeth** Get Lost`,
            `**Chungus** I share money with no-one`,
            `**Pokimane** Stop being a beggar`,
            `**The Cave Man** Nah bro sry`,
            `You asked **Quietskill1** but he shot you`,
            `You asked **AdityaPlayZ** but he nuked your server instead.`
        ]
        const random = Math.floor((Math.random() * replies.length))
        let sad = message.author
        const moresad = new MessageEmbed()
            .setTitle(`Slow Down!`)
            .setDescription(`> You can use this command every **5 minutes**!\n> Try again in: **${result.time}** `)
            .setColor('#2F3136')
        const moresadnocookie = new MessageEmbed()
            .setDescription(`${replies[random]}`)
            .setColor('RED')
        if (result.error) return message.reply({
            embeds: [moresad],
            
        })
        message.reply({
            embeds: [moresadnocookie],
            

        });
    }
}