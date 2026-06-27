const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("🔁 تكرار")
    .addStringOption((o) => o.setName("وضع").setDescription("اختر").setRequired(true)
      .addChoices({ name: "❌ مطفي", value: "off" }, { name: "🔂 أغنية", value: "song" }, { name: "🔁 قائمة", value: "queue" })),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: footerText })] });
    const mode = interaction.options.getString("وضع");
    const modeMap = { off: 0, song: 1, queue: 2 };
    const modeLabels = { off: "❌ مطفي", song: "🔂 أغنية", queue: "🔁 قائمة" };
    queue.setRepeatMode(modeMap[mode]);
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setDescription(`التكرار: **${modeLabels[mode]}**`).setFooter({ text: footerText })] });
  },
};
