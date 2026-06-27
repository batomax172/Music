const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { voidColor, footerText } = require("../../utils/constants");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("⏭️ تخطى الأغنية الحالية"),

  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ ما في شيء يشتغل!").setFooter({ text: footerText })] });
    if (!interaction.member.voice.channel) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: footerText })] });
    if (queue.songs.length <= 1) return interaction.editReply({ embeds: [new EmbedBuilder().setColor(0xff9900).setDescription("⚠️ ما في أغاني ثانية!").setFooter({ text: footerText })] });
    const skipped = queue.songs[0];
    await queue.skip();
    await interaction.editReply({ embeds: [new EmbedBuilder().setColor(voidColor).setDescription(`⏭️ تم تخطي: **${skipped.name}**`).setFooter({ text: footerText })] });
  },
};
