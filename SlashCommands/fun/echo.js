module.exports = {
    name: "echo",
    description: "Echo what you say",
    options: [{
        name: "text",
        description: "Text you want me to echo",
        type: "STRING",
        required: true
    }],
    run: async (client, interaction) => {
        const text = interaction.options.getString("text");
        if (text.includes('@everyone')) return interaction.followUp('Haha nice try!!')
        if (text.includes('@here')) return interaction.followUp('Haha nice try!!')
        return await interaction.followUp(`${text}`)
    }
}