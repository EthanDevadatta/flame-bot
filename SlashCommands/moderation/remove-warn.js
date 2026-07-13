const warnModel = require('../../models/WarningSystem');
const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: 'remove-warn',
    description: 'Remove a users warning using Warn ID',
    userPermissions: ["MANAGE_MESSAGES"],
    options: [{
        name: 'warnid',
        description: 'Warn ID you want to delete',
        type: 'STRING',
        required: true,
    }],
    run: async (client, interaction, options) => {
        const warnID = interaction.options.getString('warnid');

        const data = await warnModel.findById(warnID);

        if (!data) return interaction.followUp(`\`${warnID}\` is not a valid id`);

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);
        return interaction.followUp(`Removed 1 warning!`)
    }
}