const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");

module.exports = {
  name: "emojis",
  description:'Shows all emojis in the server',
  run: async (client, message, args) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = message.guild.emojis.cache
      .map(r => r)
      .map((r, i) => `**${i + 1}.** ${r}\`(${r.name})\``)
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor("RED")
      .setFooter({text:`Page ${page}/${Math.ceil(message.guild.emojis.cache.size / 10)}`})
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("⬅️")
      .setCustomId("previous_emoji"),
      new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("➡️")
      .setCustomId("next_emoji")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("⬅️")
      .setDisabled(true)
      .setCustomId("previous_emoji"),
      new MessageButton()
      .setStyle("PRIMARY")
      .setEmoji("➡️")
      .setDisabled(true)
      .setCustomId("next_emoji")
    );

    if (message.guild.emojis.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous_emoji") {
        i.deferUpdate()
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = message.guild.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter({text:`Page ${page}/${Math.ceil(message.guild.emojis.cache.size / 10)}`})
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_emoji") {
        i.deferUpdate()
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > message.guild.emojis.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = message.guild.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter({text:`Page ${page}/${Math.ceil(message.guild.emojis.cache.size / 10)}`})
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  }
};