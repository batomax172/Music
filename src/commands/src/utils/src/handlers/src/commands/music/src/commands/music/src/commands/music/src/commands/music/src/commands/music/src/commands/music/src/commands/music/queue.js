const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("📋 عرض قائمة التشغيل")
    .addIntegerOption((o) => o.setName("صفحة").setDescription("رقم الصفحة").setMinValue(1)),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue || queue.songs.length === 0) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ القائمة فاضية!").setFooter({ text: footerText })] });
    const pageSize = 10;
    const page = (interaction.options.getInteger("صفحة") || 1) - 1;
    const totalPages = Math.ceil(queue.songs.length / pageSize);
    const songs = queue.songs.slice(page * pageSize, (page + 1) * pageSize);
    const songList = songs.map((song, i) => {
      const index = page * pageSize + i;
      return index === 0 ? `▶️ **${song.name}** \`[${song.formattedDuration}]\`` : `\`${index}.\` **${song.name}** \`[${song.formattedDuration}]\``;
    }).join("\n");
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setTitle("📋 قائمة التشغيل").setDescription(songList).addFields({ name: "🎵 عدد الأغاني", value: `${queue.songs.length}`, inline: true }, { name: "🔊 الصوت", value: `${queue.volume}%`, inline: true }).setFooter({ text: `صفحة ${page + 1} من ${totalPages} • ${footerText}` })] });
  },
};
