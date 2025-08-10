const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  ComponentType,
  MessageFlags,
} = require("discord.js");

const data = {
  name: "show-pets",
  description: "Show pets using string select menu.",
};

/**
 *
 * @param {Object} param0
 * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
 */
async function run({ interaction }) {
  const pets = [
    {
      label: "Dog",
      description: "Loyal guardian and furry adventure buddy.",
      value: "canine_companion",
      emoji: "🐕",
    },
    {
      label: "Cat",
      description: "Master of stealth and ruler of the couch.",
      value: "feline_overlord",
      emoji: "🐈",
    },
    {
      label: "Parrot",
      description: "Feathered chatterbox with wings full of color.",
      value: "talking_rainbow",
      emoji: "🦜",
    },
  ];

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder("Make a selection...")
    .setMinValues(0)
    .setMaxValues(pets.length)
    .addOptions(
      pets.map((pet) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(pet.label)
          .setDescription(pet.description)
          .setValue(pet.value)
          .setEmoji(pet.emoji)
      )
    );

  const actionRow = new ActionRowBuilder().addComponents(selectMenu);

  const reply = await interaction.reply({ components: [actionRow] });

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    filter: (i) =>
      i.user.id === interaction.user.id && i.customId === interaction.id,
    time: 60_000,
  });

  collector.on("collect", async (selectInteraction) => {
    if (!selectInteraction.values.length) {
      await selectInteraction.reply({
        content: "You have emptied your selection.",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await selectInteraction.reply({
      content: `You have now selected: ${selectInteraction.values.join(", ")}`,
      flags: MessageFlags.Ephemeral,
    });
  });
}

module.exports = { data, run };
