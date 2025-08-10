const {
  RoleSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
  MessageFlags,
} = require("discord.js");

const data = {
  name: "show-roles",
  description: "Show roles using role select menu.",
};

/**
 *
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
async function run({ interaction }) {
  const roleMenu = new RoleSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setMinValues(0)
    .setMaxValues(3);

  const actionRow = new ActionRowBuilder().setComponents(roleMenu);

  const reply = await interaction.reply({ components: [actionRow] });

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.RoleSelect,
    filter: (i) =>
      i.user.id === interaction.user.id && i.customId === interaction.id,
    time: 60_000,
  });

  collector.on("collect", async (i) => {
    if (!i.values.length) {
      await i.reply({
        content: "You have emptied your selection.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await i.update({
      content: `You have now selected: ${i.values.join(", ")}`,
      flags: MessageFlags.Ephemeral,
    });
  });
}

module.exports = { data, run };
