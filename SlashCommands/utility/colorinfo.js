const {
    MessageButton,
    MessageActionRow,
    CommandInteraction,
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: "colorinfo",
    description: "Give any hex code for its color information",
    options: [{
        name: 'hex',
        type: 'STRING',
        description: 'Give the hex code for the color information',
        required: true,
    }, ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String} args 
     * @returns 
     */
    run: async (client, interaction, args) => {
        const fetch = require('node-fetch')
        let color = interaction.options.getString('hex')
        if (color.includes("#")) {
            color = args[0].split("#")[1]
        }
        const url = (`https://api.alexflipnote.dev/colour/${color}`)
        let json
        try {

            json = await fetch(url).then(res => res.json())
        } catch (e) {
            return interaction.followUp('An Error Occured, Try Again Later.')
        }

        if (json.description) return interaction.followUp("Invalid hex code!")
        let embed = new MessageEmbed()
            .setTitle(json.name)
            .addField("RGB", json.rgb || "Not found!", true)
            .addField("Brightness", json.brightness ? "Not Found!" : json.brightness, true)
            .addField("Hex", json.hex || "Not Found!", true)
            .setThumbnail(json.image)
            .setImage(json.image_gradient, true)
            .setColor(json.hex)
        interaction.followUp({
            embeds: [embed]
        })
    }
}