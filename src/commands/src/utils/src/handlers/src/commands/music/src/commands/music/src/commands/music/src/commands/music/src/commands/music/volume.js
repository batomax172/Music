const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("🔊 تعديل مستوى الصوت")
    .addIntegerOption((o) => o.setName("مستوى").setDescription("1 - 100").setMinValue(1).setMaxValue(100).setRequired(true)),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: footerText })] });
    const vol = interaction.options.getInteger("مستوى");
    queue.setVolume(vol);
    const emoji = vol >= 70 ? "🔊" : vol >= 30 ? "🔉" : "🔈";
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setDescription(`${emoji} الصوت: **${vol}%**`).setFooter({ text: footerText })] });
  },
};
