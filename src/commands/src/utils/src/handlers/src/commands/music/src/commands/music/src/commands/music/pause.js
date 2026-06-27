const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("⏸️ توقّف مؤقت"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: footerText })] });
    if (queue.paused) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff9900).setDescription("⚠️ متوقفة أصلاً! استخدم `/resume`").setFooter({ text: footerText })] });
    queue.pause();
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setDescription("⏸️ تم الإيقاف المؤقت.").setFooter({ text: footerText })] });
  },
};
