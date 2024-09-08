// commands/embedCommand.js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create a custom embed message")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the embed")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("description").setDescription("Description of the embed")
    )
    .addStringOption((option) =>
      option.setName("author").setDescription("Author name")
    )
    .addStringOption((option) =>
      option.setName("authoricon").setDescription("URL of the author's icon")
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Hex color code for the embed (e.g., #ff0000)")
    )
    .addStringOption((option) =>
      option.setName("footer").setDescription("Footer text")
    )
    .addStringOption((option) =>
      option.setName("footericon").setDescription("URL of the footer's icon")
    )
    .addBooleanOption((option) =>
      option
        .setName("timestamp")
        .setDescription("Whether to include a timestamp")
    )
    .addStringOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("URL of the footer's icon")
        .addChoices(
          {
            name: "True",
            value: "true",
          },
          {
            name: "False",
            value: "false",
          }
        )
    ),

  async execute(interaction) {
    // Retrieve options from the interaction
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const author = interaction.options.getString("author");
    const authorIcon = interaction.options.getString("authoricon");
    const color = interaction.options.getString("color") || "#0099ff"; // Default color
    const footer = interaction.options.getString("footer");
    const footerIcon = interaction.options.getString("footericon");
    const timestamp = interaction.options.getBoolean("timestamp") || false; // Default to false
    const ephemeral = interaction.options.getString("ephemeral") === "true"; // Convert string

    // Create the embed
    const embed = new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setDescription(description)
      .setAuthor({
        name: author,
        iconURL: authorIcon,
      })
      .setFooter({ text: footer, iconURL: footerIcon });

    // Conditionally add a timestamp
    if (timestamp) {
      embed.setTimestamp();
    }

    // Send the embed
    await interaction.reply({ embeds: [embed], ephemeral });
  },
};
