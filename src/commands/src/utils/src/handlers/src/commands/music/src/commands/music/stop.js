const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("⏹️ وقّف الموسيقى وامسح القائمة"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: footerText })] });
    await queue.stop();
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setDescription("⏹️ تم إيقاف الموسيقى ومسح القائمة!").setFooter({ text: footerText })] });
  },
};
