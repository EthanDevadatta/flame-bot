const {
    Client,
    CommandInteraction
} = require("discord.js");

module.exports = {
    name: "clyde",
    description: "Get a custom clyde message",
    options: [{
        name: "text",
        description: "Input some text for clyde",
        type: "STRING",
        required: true,
    }],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const {
            something
        } = interaction.options.getString("text");

        const text = args.join(" ");

        interaction.followUp({
            files: [{
                attachment: `https://ctk-api.herokuapp.com/clyde/${text}`,
                name: "file.jpg",
            }, ],
        });
    }
}