// const client = require('../index');

// client.on('messageCreate', async (message) => {
//     if (
//         message.author.bot ||
//         !message.guild
//     )
//         return;
//     let msg = message.content;

//     let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
//     if (!emojis) return;
//     emojis.forEach(m => {
//         let emoji = client.emojis.cache.find(x => x.name == m)
//         if (!emoji) return console.log('nope, no emoji');
//         let temp = emoji.toString()
//         if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
//         else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
//     })

//     if (msg === message.content) return;
//     try {
//         await message.channel.createWebhook(message.member.nickname ? message.member.nickname : message.author.username, {
//             avatar: message.author.displayAvatarURL()
//         })

//         const webhooks = await message.channel.fetchWebhooks();
//         const webhook = webhooks.find(wh => wh.token);

//         await webhook.send({ content: msg })
//         await webhook.delete()
//         message.delete()
//     } catch (err) {
//         console.error(err)
//     }

// })