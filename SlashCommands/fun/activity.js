const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require("discord.js");

module.exports = {
    name: 'activity',
    description: 'Play discord activities',
    options: [{
            name: 'channel',
            type: 'CHANNEL',
            description: 'Channel to use the activity',
            channelTypes: ['GUILD_VOICE'],
            required: true,
        },
        {
            name: 'activity',
            type: 'STRING',
            description: 'The activity you wanna use',
            required: true,
            choices: [{
                    name: 'youtube',
                    value: 'youtube',
                },
                {
                    name: 'poker',
                    value: 'poker',
                },
                {
                    name: 'fishington',
                    value: 'fishington',
                },
                {
                    name: 'betrayal',
                    value: 'betrayal',
                },
                {
                    name: 'chess',
                    value: 'chess',
                },
                {
                    name: 'letter-tile',
                    value: 'letter-tile',
                },
                {
                    name: 'words-snack',
                    value: 'words-snack',
                },
                {
                    name: 'spellcast',
                    value: 'spellcast',
                },
                {
                    name: 'awkword',
                    value: 'awkword',
                },
                {
                    name: 'doodle-crew',
                    value: 'doodle-crew',
                },
            ],
        }
    ],
    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel('channel');
        const act = interaction.options.getString('activity');

        if (act === 'youtube') {
            client.discordTogether.createTogetherCode(channel.id, 'youtube').then(async invite => {
                const ytembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your YouTube Activity**`)
                    .setColor('#2F3136')

                const ytbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('YouTube')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [ytembed],
                    components: [ytbutton]
                })
            })
        } else if (act === 'poker') {
            client.discordTogether.createTogetherCode(channel.id, 'poker').then(async invite => {
                const pokerembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Poker Activity**`)
                    .setColor('#2F3136')

                const pokerbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Poker')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [pokerembed],
                    components: [pokerbutton]
                })
            })
        } else if (act === 'fishington') {
            client.discordTogether.createTogetherCode(channel.id, 'fishing').then(async invite => {
                const fishembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Fishington Activity**`)
                    .setColor('#2F3136')

                const fishbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Fishington')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [fishembed],
                    components: [fishbutton],
                })
            })
        } else if (act === 'betrayal') {
            client.discordTogether.createTogetherCode(channel.id, 'betrayal').then(async invite => {
                const betembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Betrayal Activity**`)
                    .setColor('#2F3136')

                const betbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Betrayal')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [betembed],
                    components: [betbutton],
                })
            })
        } else if (act === 'chess') {
            client.discordTogether.createTogetherCode(channel.id, 'chess').then(async invite => {
                const betembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Betrayal Activity**`)
                    .setColor('#2F3136')

                const betbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Betrayal')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [betembed],
                    components: [betbutton],
                })
            })
        } else if (act === 'letter-tile') {
            client.discordTogether.createTogetherCode(channel.id, 'lettertile').then(async invite => {
                const ltembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Letter Tile Activity**`)
                    .setColor('#2F3136')

                const ltbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Letter Tile')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [ltembed],
                    components: [ltbutton],
                })
            })
        }  else if (act === 'words-snack') {
            client.discordTogether.createTogetherCode(channel.id, 'wordsnack').then(async invite => {
                const wsembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Words Snack Activity**`)
                    .setColor('#2F3136')

                const wsbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Words Snack')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [wsembed],
                    components: [wsbutton],
                })
            })
        } else if (act === 'spellcast') {
            client.discordTogether.createTogetherCode(channel.id, 'spellcast').then(async invite => {
                const scembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your SpellCast Activity**`)
                    .setColor('#2F3136')

                const scbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('SpellCast')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [scembed],
                    components: [scbutton],
                })
            })
        } else if (act === 'awkword') {
            client.discordTogether.createTogetherCode(channel.id, 'awkword').then(async invite => {
                const adembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Awkword Activity**`)
                    .setColor('#2F3136')

                const adbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Awkword')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [adembed],
                    components: [adbutton],
                })
            })
        } else if (act === 'doodle-crew') {
            client.discordTogether.createTogetherCode(channel.id, 'doodlecrew').then(async invite => {
                const dcembed = new MessageEmbed()
                    .setDescription(`> **Click on the button to start your Doodle Crew Activity**`)
                    .setColor('#2F3136')

                const dcbutton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Doodle Crew')
                        .setStyle('LINK')
                        .setURL(invite.code)
                    );

                return interaction.followUp({
                    embeds: [dcembed],
                    components: [dcbutton],
                })
            })
        }
    }
}