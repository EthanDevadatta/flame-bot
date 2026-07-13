const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const Schema = require('../../models/User Profile/birthday')

module.exports = {
    name: 'set-birthday',
    aliases: ['set-bday', 'setbday'],
    description: 'Set your birthday date for your profile',
    usage: '<date>/<month>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }

        const joined = args.join(" ")
        const split = joined.trim().split("/")

        let [day, month] = split

        if (!day) return message.reply(`${process.env.FAILURE_EMOJI} Argument Error: \`${process.env.PREFIX}set-birthday day/month\`. Eg: \`${process.env_PREFIX}set-birthbirthday 30/3\``)
        if (!month) return message.reply(`${process.env.FAILURE_EMOJI} Argument Error: \`${process.env.PREFIX}set-birthday day/month\`. Eg: \`${process.env_PREFIX}set-birthbirthday 30/3\``)

        if (isNaN(day) || isNaN(month))
            return message.reply(process.env.FAILURE_EMOJI + "The date you gave me is not a number")

        day = parseInt(day);
        month = parseInt(month)

        if (!day || day > 31) return message.reply(process.env.FAILURE_EMOJI + "Wrong Date Format, there are only 30 or 31 days in a month")
        if (!month || month > 12) return message.reply(process.env.FAILURE_EMOJI + "Wrong Month Format, there are only 12 months in a year")

        const convertedDay = suffixes(day)
        const convertedMonth = months[month]
        const birthdayString = `${convertedDay} of ${convertedMonth}`
        Schema.findOne({
            User: message.author.id
        }, async (err, data) => {
            if (data) {
                data.birthday = birthdayString
                data.save()
            } else {
                new Schema({
                    User: message.author.id,
                    Birthday: birthdayString
                }).save()
            }
        })

        message.reply(`${process.env.SUCCESS_EMOJI} Saved as ${convertedDay} of ${convertedMonth}`)
    },
};
/**
 * @param {Number} number
 */
function suffixes(number) {
    const converted = number.toString();

    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" ?
        `${converted}st` : lastChar == "2" ?
        `${converted}nd` : lastChar == '3' ?
        `${converted}rd` : `${converted}th`
}