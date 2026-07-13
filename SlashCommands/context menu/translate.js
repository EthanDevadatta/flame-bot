const {
    MessageEmbed
} = require('discord.js');
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "translate",
    type: "MESSAGE",
    run: async (client, interaction, args) => {
        const lang = {
            "en-US": "en", // English
            "hi": "hi", // Hindi
            "en-GB": "en", // English
            "bg": "bg", // Bulgarian
            "zh-CN": "zh-cn", // Chinese (China)
            "zh-TW": "zh-tw", // Chinese (Taiwan)
            "hr": "hr", // Croatian
            "cs": "cs", // Czech
            "da": "da", // Danish
            "nl": "nl", //Dutch
            "fi": "fi", // Finnish
            "fr": "fr", // French
            "de": "de", // German
            "el": "el", // Greek
            "hu": "hu", // Hungarian
            "it": "it", // Italian
            "ja": "ja", //	Japanese
            "ko": "ko", //	Korean
            "lt": "lt", //	Lithuanian
            "no": "no", //	Norwegian
            "pl": "pl", //	Polish
            "pt-BR": "pt", //	Portuguese (Brazil)
            "ro": "ro", //	Romanian
            "ru": "ru", //	Russian
            "es-ES": "es", //	Spanish (Spain)
            "sv-SE": "sv", //	Swedish
            "th": "th", //	Thai
            "tr": "tr", //	Turkish
            "uk": "uk", //	Ukrainian
            "vi": "vi", //  Vietnamese
        }
        const langFull = {
            "en": "English",
            "hi": "Hindi",
            "en": "English",
            "bg": "Bulgarian",
            "zh-cn": "Chinese",
            "zh-tw": "Chinese",
            "hr": "Croatian",
            "cs": "Czech",
            "da": "Danish",
            "nl": "Dutch",
            "fi": "Finnish",
            "fr": "French",
            "de": "German",
            "el": "Greek",
            "hu": "Hungarian",
            "it": "Italian",
            "ja": "Japanese",
            "ko": "Korean",
            "lt": "Lithuanian",
            "no": "Norwegian",
            "pl": "Polish",
            "pt": "Portuguese",
            "ro": "Romanian",
            "ru": "Russian",
            "es": "Spanish",
            "sv": "Swedish",
            "th": "Thai",
            "tr": "Turkish",
            "uk": "Ukrainian",
            "vi": "Vietnamese",
        }
        const txt = await interaction.channel.messages.fetch(interaction.targetId);
        const LangToTranslate = lang[interaction?.locale]

        translate(txt, {
                from: 'auto',
                to: LangToTranslate
            }).then(res => {

                const transEmbed = new MessageEmbed()
                    .setColor('RED')
                    .addField('Text Given:', `\`\`\`${txt}\`\`\``)
                    .addField('Translated Text:', `\`\`\`${res.text}\`\`\``)
                    .setFooter({
                        text: `From ${langFull[res.from.language.iso]} To ${langFull[LangToTranslate]}`
                    })
                interaction.followUp({
                    embeds: [transEmbed]
                })
            })
            .catch(err => {
                interaction.followUp('ERROR!')
                console.log(err)
            })
    }
}