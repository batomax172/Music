const { EmbedBuilder } = require("discord.js");
const voidColor = 0x7c3aed;

module.exports = (client) => {
  const distube = client.distube;

  distube.on("playSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor(voidColor)
      .setTitle("🎵 يشتغل الآن")
      .setDescription(`**[${song.name}](${song.url})**`)
      .addFields(
        { name: "المدة", value: song.formattedDuration, inline: true },
        { name: "طلب من", value: `${song.user}`, inline: true },
        { name: "الصوت", value: `${queue.volume}%`, inline: true }
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: "Void Music Bot • All Rights Reserved © Void" });
    queue.textChannel?.send({ embeds: [embed] });
  });

  distube.on("addSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor(voidColor)
      .setTitle("✅ تمت الإضافة للقائمة")
      .setDescription(`**[${song.name}](${song.url})**`)
      .addFields(
        { name: "المدة", value: song.formattedDuration, inline: true },
        { name: "الموضع", value: `${queue.songs.length}`, inline: true }
      )
      .setThumbnail(song.thumbnail)
      .setFooter({ text: "Void Music Bot • All Rights Reserved © Void" });
    queue.textChannel?.send({ embeds: [embed] });
  });

  distube.on("finish", (queue) => {
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setColor(voidColor).setDescription("⏹️ انتهت القائمة!").setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
    });
  });

  distube.on("error", (channel, error) => {
    console.error("[DisTube Error]", error);
    channel?.send({
      embeds: [new EmbedBuilder().setColor(0xff0000).setDescription(`❌ خطأ: \`${error.message}\``).setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
    });
  });

  distube.on("empty", (queue) => {
    queue.textChannel?.send({
      embeds: [new EmbedBuilder().setColor(0xff9900).setDescription("⚠️ الروم فاضي! سأغادر.").setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
    });
  });
};
