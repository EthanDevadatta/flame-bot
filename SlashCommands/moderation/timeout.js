const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');
const ms = require('ms')

module.exports = {
    name: "timeout",
    description: "Timeout a user",
    userPermissions: ["MODERATE_MEMBERS"],
    botPermissions: ["MODERATE_MEMBERS"],
    options: [{
            name: 'member',
            type: 'USER',
            description: 'The member you want to timeout',
            required: true,
        },
        {
            name: 'time',
            type: 'STRING',
            description: 'The amount of time to timeout',
            required: true,
        },
        {
            name: 'reason',
            type: 'STRING',
            description: 'The reason for the timeout',
            required: true,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const user = interaction.options.getUser('member');
        const member = interaction.guild.members.cache.get(user.id)
        const time = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');
        const timeCheck = ms(time);
        if (!timeCheck) return interaction.following('Invalid time')

        let erm = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + " This user isn't in this guild!").setColor(`RED`)
        if (!user) return interaction.followUp({
            embeds: [erm]
        })

        const failed = new MessageEmbed().setDescription(process.env.FAILURE_EMOJI + ` You can't Timeout this member because their role is higher than yours!`).setColor("RED")

        if (user.roles.highest.position >= interaction.guild.me.roles.highest.position ||
            user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.followUp({
                embeds: [failed]
            })

        const selfTimeout = new MessageEmbed()
            .setDescription(process.env.FAILURE_EMOJI + " You can't Timeout your self")
            .setColor("RED")
        if (user.id === interaction.user.id) return interaction.followUp({
            embeds: [selfTimeout]
        });

        const botTimeout = new MessageEmbed()
            .setDescription(process.env.FAILURE_EMOJI + " You cant Timeout me").setColor('RED')
        if (user.id === client.user.id) return interaction.followUp({
            embeds: [botTimeout]
        });

        member.timeout(timeCheck, reason);
        interaction.followUp(`${user} Has been Timeouted for \`${time}\`, **Reason:** ${reason}`)


    }
}