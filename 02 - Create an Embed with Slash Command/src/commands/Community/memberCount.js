const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Get the current member count of the server"),

  async execute(interaction) {
    const server = interaction.guild;

    // Count members by type and status
    const totalMembers = server.memberCount;
    const totalBots = server.members.cache.filter(
      (member) => member.user.bot
    ).size;
    const totalHumans = totalMembers - totalBots;
    const onlineHumans = server.members.cache.filter(
      (member) => !member.user.bot && member.presence?.status == "online"
    ).size;
    const onlineBots = server.members.cache.filter(
      (member) => member.user.bot && member.presence?.status === "online"
    ).size;
    const offlineMembers = server.members.cache.filter(
      (member) => member.presence?.status === "offline"
    ).size;

    const embed = new EmbedBuilder()
      .setTitle("Server Member Count")
      .setDescription(`Here’s a detailed breakdown of the server members:`)
      .setColor("#0099ff") // Blue color
      .setThumbnail(server.iconURL()) // Server icon
      .addFields(
        { name: "Total Humans", value: `${totalHumans}`, inline: true },
        { name: "Total Bots", value: `${totalBots}`, inline: true },
        { name: "Total Members", value: `${totalMembers}`, inline: true },
        { name: "Online Humans", value: `${onlineHumans}`, inline: true },
        { name: "Online Bots", value: `${onlineBots}`, inline: true },
        { name: "Offline Accounts", value: `${offlineMembers}`, inline: true }
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    // await interaction.reply({content: `${onlineHumans}`,ephemeral: true,});
  },
};
