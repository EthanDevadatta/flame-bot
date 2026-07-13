const {
    Client,
    Message,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'premium',
    description: 'Premium commannds info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {

        const embed = new MessageEmbed()
            .setTitle('Premium!')
            .setColor('#FFD700')
            .setThumbnail('https://media.discordapp.net/attachments/847794443180048394/855412912470622218/New_Project.png?width=613&height=613')
            .setDescription('Here is some information about premium!')
            .addField('Premium Commands', '`-` addlevel: Add level to a user!\n`-` addxp: Add xp to a user!\n`-` setlevel: Set a level to a user!\n`-` setxp: Set xp to a user!\n`-` removelevel: Remove a level from a user!\n`-` removexp: Remove xp from a user!')
            .addField('Discord Sever Benefits', '`-` Premium Role\n`-` Access Self-Promo Channel\n`-` Can bypass all requirements for Giveaways!!\n')
            .addField('Want to Buy Premium?', 'If you want to know the prices or want to buy premium, then join the [Support Server](https://discord.gg/bdepmAA2HP)')

        let button = new MessageActionRow()
            .addComponents(new MessageButton()
                .setStyle('LINK')
                .setLabel('Get Premium!')
                .setURL('https://discord.gg/bdepmAA2HP')
            )

        interaction.followUp({
            components: [button],
            embeds: [embed]
        });


    }
}