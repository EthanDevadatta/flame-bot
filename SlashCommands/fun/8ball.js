const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const answers = [
    'Maybe.',
    'Certainly not.',
    'I hope so.',
    'Not in your wildest dreams.',
    'There is a good chance.',
    'Quite likely.',
    'I think so.',
    'I hope not.',
    'I hope so.',
    'Never!',
    'Fuhgeddaboudit.',
    'Ahaha! Really?!?',
    'Pfft.',
    'Sorry, bucko.',
    'Hell, yes.',
    'Hell to the no.',
    'The future is bleak.',
    'The future is uncertain.',
    'I would rather not say.',
    'Who cares?',
    'Possibly.',
    'Never, ever, ever.',
    'There is a small chance.',
    'Yes!'
];
module.exports = {
    name: '8ball',
    description: '8ball!',
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Your question',
            name: 'question',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let yq = args.join(' ')
        let q = args.join(' ')
        if (!q) return 
        else {
            const embed = new MessageEmbed()
                .setDescription(`**Question:** \n ${yq} \n**My Answer:** \n ${answers[Math.floor(Math.random() * answers.length)]}`)
                .setColor("#2F3136")
            interaction.followUp({ embeds: [embed] });
        }
    }
}