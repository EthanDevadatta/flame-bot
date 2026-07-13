const {
    Client,
    Message,
    MessageEmbed
} = require("discord.js");
const Levels = require('discord-xp')
const LevelDB = require("../../models/level");
const BannerDB = require('../../models/User Profile/banner');
const BdayDB = require('../../models/User Profile/birthday');
const BioDB = require('../../models/User Profile/bio');
const ColorDB = require('../../models/User Profile/color');
const PremiumDB = require('../../models/premium');
const CurrencySystem = require('currency-system')
const cs = new CurrencySystem;

module.exports = {
    name: 'profile',
    description: 'Shows a users profile',
    options: [{
        name: "member",
        description: "Input member to get banner",
        type: "USER",
        required: true,
    }, ],
    run: async (client, interaction, args) => {

        const user = interaction.options.getMember("member");

        const LevelData = await LevelDB.findOne({
            Guild: interaction.guild.id
        });
        const BannerData = await BannerDB.findOne({
            User: user.user.id,
        });
        const BdayData = await BdayDB.findOne({
            User: user.user.id,
        });
        const BioData = await BioDB.findOne({
            User: user.user.id,
        });
        const ColorData = await ColorDB.findOne({
            User: user.user.id,
        });
        const PremiumData = await PremiumDB.findOne({
            User: user.user.id,
        });
        const result = await cs.balance({
            user: user.user,
        });
        const percentage = (result.bank / result.rawData.bankSpace) * 100;
        const WalletMoney = result.wallet.toLocaleString()
        const BankMoney = `$${result.bank.toLocaleString()} / $${result.rawData.bankSpace.toLocaleString()}`
        const badgesArray = {
            HOUSE_BRAVERY: "<:hypesquad_bravery:814491294696341524>",
            HOUSE_BRILLIANCE: "<:hypesquad_brilliance:814491312124330004>",
            HOUSE_BALANCE: "<:hypesquad_balance:814491283769786368>",
            BUGHUNTER_LEVEL_1: "<:bug_hunter:814491292369289276>",
            BUGHUNTER_LEVEL_2: "<:bug_hunter_2:814491290145259560>",
            HYPESQUAD_EVENTS: "<:hypesquad_events:814491280171073576>",
            EARLY_VERIFIED_DEVELOPER: "<:early_verified_bot_developer:814491299411263500>",
            VERIFIED_DEVELOPER: "<:early_verified_bot_developer:814491299411263500>",
            DISCORD_PARTNER: "<:partnered:814491300068851725>",
            PARTNERED_SERVER_OWNER: "<:partnered_server_owner:814491286026977281>",
            EARLY_SUPPORTER: "<:EarlySupporter:879034495536340993>",
            DISCORD_EMPLOYEE: "<:discord_staff:814491281832804416>"
        };

        const badgecheck = user.user.flags?.toArray()
        const badges = `${badgecheck?.length ? `${badgecheck.map(flag => badgesArray[badgecheck]).join(' ')}` : ''}`

        let level;
        if (!LevelData) {
            user.user.id
            level = " Leveling System is Disabled "
        } else {
            const target = await Levels.fetch(user.user.id, interaction.guild.id, true);
            const xp = target.xp || 0
            const userlevel = target.level || 0
            const rank = target.position || 0
            level = `Xp: ${xp}\nLevel: ${userlevel}\nRank: ${rank}`
        }

        let banner;
        if (!BannerData) {
            banner = ""
        } else {
            banner = BannerData.Banner
        }

        let birthday;
        if (!BdayData) {
            birthday = " Birthday Not Set "
        } else {
            birthday = BdayData.Birthday
        }

        let bio;
        if (!BioData) {
            bio = " Bio Not Set "
        } else {
            bio = BioData.Bio
        }

        let color;
        if (!ColorData) {
            color = "#2F3136"
        } else {
            color = ColorData.Color
        }

        let NitroBadge;
        if (user.user.displayAvatarURL({
                dynamic: true
            }).includes(".gif")) {
            NitroBadge = "<:nitro:814491314988515329>"
        } else {
            NitroBadge = ""
        }
        const {
            owners
        } = require('../../json/owners.json');
        let BotDev;
        if (owners.includes(user.user.id)) {
            BotDev = "<:Developer_Badge:922206371678654484>"
        } else {
            BotDev = ""
        }
        let premium;
        if (!PremiumData) {
            premium = ""
        } else {
            premium = "<:Premium_User:921255738674917416>"
        }

        let AllBadges = badges + NitroBadge + BotDev + premium
        if (AllBadges == "") AllBadges = "No Badges!"
        const embed1 = new MessageEmbed()
            .setAuthor({
                name: user.user.tag,
                iconURL: user.user.displayAvatarURL({dynamic: true})
            })
            .setTitle(`${user.user.tag}'s Profile`)
            .setColor(color)
            .setURL('https://discord.gg/6t6Vm6zq')
            .setThumbnail(user.user.displayAvatarURL({
                dynamic: true
            }))
            .addField('User', `${user.user.tag} \`${user.user.id}\``)
            .addField('Bio', `\`${bio}\` <:bio:863288347433893898>`)
            .addField('Creation', `Created: <t:${Math.floor(user.user.createdTimestamp / 1000)}:R> <:tick:863289779092848670>`)
            .addField('Birthday', `\`${birthday}\` <:birthday:863303772301426688>`)
            .addField('Economy', `\nWallet: \` $${WalletMoney} \` 💳\nBank: \` ${BankMoney} \` (\`${percentage}%\`) 🏦`)
            .addField('Badges', AllBadges)
            .addField('Leveling', level)
            .setFooter({text: process.env.BOT_NAME, iconURL: process.env.BOT_ICON})
            .setImage(banner)
            .setTimestamp()
        interaction.followUp({
            embeds: [embed1]
        })


    }
}