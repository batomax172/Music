const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("🎵 الأغنية الحالية"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    const song = queue.songs[0];
    const current = queue.currentTime;
    const total = song.duration;
    const barLength = 20;
    const filled = Math.round((current / total) * barLength);
    const bar = "█".repeat(filled) + "░".repeat(barLength - filled);
    const fmt = (s) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return `${m}:${String(sec).padStart(2, "0")}`; };
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setTitle("🎵 يشتغل الآن").setDescription(`**[${song.name}](${song.url})**\n\n\`${fmt(current)}\` ${bar} \`${song.formattedDuration}\``).addFields({ name: "👤 طلب من", value: `${song.user}`, inline: true }, { name: "🔊 الصوت", value: `${queue.volume}%`, inline: true }).setThumbnail(song.thumbnail).setFooter({ text: footerText })] });
  },
};
