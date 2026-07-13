const { MessageEmbed } = require('discord.js');
const CurrencySystem = require('currency-system');
const cs = new CurrencySystem;

module.exports = {
    name: "work",
    description: "work with different jobs and earn money",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        let result = await cs.work({
            user: message.author,
            maxAmount: 1000,
            replies: ['Memer', 'Youtuber', 'Programmer', 'cookie seller', 'engineer', 'doctor', 'chef', 'Dicord bot developer', 'Mr Beast'],
            cooldown: 35 
        })
        let author = message.author
        const potatoTime = new MessageEmbed()
       .setTitle(`Slow Down!`)
           .setDescription(`> You can use this command every **35 seconds**!\n> Try again in: **${result.time}** `)
           .setColor('#2F3136')
        const cookie = new MessageEmbed()
        .setDescription(`${author} worked hard as a ${result.workType} and got \` $${result.amount} \` coins`)
        .setColor('RED')
        if (result.error) return message.reply({
            embeds: [potatoTime],
            
        });
        else message.reply({
            embeds: [cookie],
            
        })
    }
}