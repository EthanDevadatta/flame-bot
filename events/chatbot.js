const fetch = require(`node-fetch`)
const Discord = require(`discord.js`);
const client = require('../index')
client.on(`messageCreate`, async (message) => {
  try {
    const chatbotSchema = require("../models/chatbot")
    chatbotSchema.findOne({
      guild: message?.guild?.id
    }, async (err, data) => {
      if (!data) return;
      if (err) throw err
      const channell = data?.channel
      if (message.channel.id === channell) {
        if (message.author.bot || message.channel.type === `dm`) return;
        
          const mapObj = {
            'Acobot Team': 'Fire Development',
            'Aco': 'Flame Bot'
          }
          message.channel.sendTyping();
          fetch(`http://api.brainshop.ai/get?bid=163642&key=&uid=${message.author.id}&msg=${message.content}`) //https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}&
            .then(response => response.json())
            .then(data => {
              message.reply({
                content: `> ${data.response.replace(/\b(?:Acobot Team|Aco)\b/gi, matched => mapObj[matched])}`
              });
            }).catch(() => {
              return message.reply('An error occurred, this happened cause of rate limit... please dont spam this..')
            })
      }
    })
  } catch (error) {
    return
  }
})
