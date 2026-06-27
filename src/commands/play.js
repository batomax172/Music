const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("🎵 شغّل أغنية أو قائمة تشغيل")
    .addStringOption((o) =>
      o.setName("اغنية").setDescription("اسم الأغنية أو رابطها").setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply();
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.editReply({
        embeds: [new EmbedBuilder().setColor(0xff0000).setDescription("❌ لازم تكون في روم صوتي!").setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
      });
    }
    const query = interaction.options.getString("اغنية");
    try {
      await client.distube.play(voiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
      await interaction.editReply({
        embeds: [new EmbedBuilder().setColor(0x7c3aed).setDescription(`🔍 جاري البحث عن: **${query}**`).setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
      });
    } catch (err) {
      await interaction.editReply({
        embeds: [new EmbedBuilder().setColor(0xff0000).setDescription(`❌ خطأ: \`${err.message}\``).setFooter({ text: "Void Music Bot • All Rights Reserved © Void" })]
      });
    }
  },
};
