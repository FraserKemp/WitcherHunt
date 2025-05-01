import {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ButtonInteraction,
  EmbedBuilder,
} from "discord.js";
import { rollRarity } from "../../utils/rollRarity";
import { withUser } from "../commandUserWrapper";
import { getMonstersByRarity } from "../../database/Monsters/getMonstersByRarity";
import { UserData } from "../../types/UserTypes/UserTypes";
import { KillItem, killItems } from "../../Enums/Items";

export const huntCommand = new SlashCommandBuilder()
  .setName("hunt")
  .setDescription("Go on a monster hunt!");

const executeHunt = async (
  interaction: CommandInteraction,
  userData: UserData,
) => {
  const rarity = rollRarity();
  console.log(rarity, "RARITY HERE");
  const monstersForRarityResponse = await getMonstersByRarity(
    rarity.monsterRarity,
  );

  const username = interaction.user.username;
  const specialRarity = rarity.specialRarity;

  if (!monstersForRarityResponse.success) {
    await interaction.reply(
      `Error occurred fetching monsters for rarity: ${
        specialRarity ?? rarity
      }\n\nPlease try again`,
    );
    return;
  }

  if (monstersForRarityResponse.data.length === 0) {
    await interaction.reply(
      `No monsters found for rarity: ${specialRarity ?? rarity}`,
    );
    return;
  }

  const monsterData = monstersForRarityResponse.data;

  const monster = monsterData[Math.floor(Math.random() * monsterData.length)];

  console.log(monster);

  // TODO make different descriptions based on the monster type

  const userItems = userData.inventory.items;
  const footerTextItems = `=========Items left=========
Rusty dagger: ${userItems.rusty_dagger} | Steel sword ${userItems.steel_sword}
Silver sword: ${userItems.silver_sword} | Binding Stone: ${userItems.binding_stone}`;

  // TODO update user region once travelling is implemented
  // TODO update title to ask them to pick a emoji item
  const embed = new EmbedBuilder()
    .setTitle(
      `<:geralt_character:1367212610835058748> **${username}** hunted a wild ${
        specialRarity ?? ""
      }${monster.name}! `,
    )
    .setDescription("This beast darkens the skies. Will you attack or trap it?")
    .setImage(`attachment://archgriffen_body.png`) // sits cleanly in the center
    .setFooter({
      text: `Rarity: ${
        specialRarity ?? rarity.monsterRarity
      }\nType: Draconid\nCurrent region: Novigrad\nMonster region: ${
        monster.region
      }\n\n${footerTextItems}\n\nChoose an action`,
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("attack")
      .setLabel("⚔️")
      .setStyle(ButtonStyle.Secondary),
    // new ButtonBuilder()
    //   .setCustomId("capture")
    //   .setLabel("🪢")
    //   .setStyle(ButtonStyle.Secondary),
  );

  await interaction.reply({
    content: `A wild **${monster.name}** appeared! (Rarity: ${monster.rarity})\nChoose your action:`,
    embeds: [embed],
    components: [row],
    files: [
      {
        attachment: "src/assets/images/archgriffen_body.png",
        name: "archgriffen_body.png",
      },
    ],
    ephemeral: false,
  });

  const message = await interaction.fetchReply();

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 15000, // 15s window to choose
    max: 1,
  });

  collector.on("collect", async (btnInteraction: ButtonInteraction) => {
    if (btnInteraction.user.id !== interaction.user.id) {
      await btnInteraction.reply({
        content: "This isn’t your hunt!",
        ephemeral: true,
      });
      return;
    }

    if (btnInteraction.customId === "attack") {
      const itemOrder = [
        "rusty_dagger",
        "steel_sword",
        "silver_sword",
        "binding_stone",
      ];

      const availableItems = Object.entries(userData.inventory.items)
        .filter(([itemId, count]) => count > 0 && itemOrder.includes(itemId)) // keep only valid items in desired order
        .map(([itemId]) => killItems[itemId])
        .sort((a, b) => itemOrder.indexOf(a.id) - itemOrder.indexOf(b.id));

      if (availableItems.length === 0) {
        return await btnInteraction.update({
          content: "You don’t have any items to attack with!",
          components: [],
        });
      }

      const buttons = availableItems.map((item) =>
        new ButtonBuilder()
          .setCustomId(`${item.id}`)
          .setEmoji(item.emoji)
          .setStyle(ButtonStyle.Secondary),
      );

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        ...buttons,
      );

      await btnInteraction.update({
        content: "🗡️ Choose your item to attack with:",
        components: [row],
      });

      const itemCollector =
        btnInteraction.message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 15000,
          max: 1,
        });

      itemCollector.on("collect", async (itemInteraction) => {
        if (itemInteraction.user.id !== interaction.user.id) {
          return itemInteraction.reply({
            content: "This isn’t your hunt!",
            ephemeral: true,
          });
        }

        const item: KillItem = killItems[itemInteraction.customId];

        if (!item) {
          return itemInteraction.reply({
            content: "Invalid item selected.",
            ephemeral: true,
          });
        }

        // Decrement inventory here if you're saving to DB
        // await updateUserInventory(...)

        // used item item.name

        const roll = Math.random() * 100;
        const chance = item.killChances[monster.rarity];
        const killed = roll <= chance;

        const resultButton = new ButtonBuilder()
          .setCustomId("result")
          .setEmoji(killed ? "✅" : "❌")
          .setStyle(ButtonStyle.Secondary);

        const resultRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
          resultButton,
        );

        const updatedEmbed = EmbedBuilder.from(embed)
          .setTitle(killed ? "✅ Monster Defeated!" : "❌ Monster Escaped!")
          .setDescription(
            killed
              ? `${item.name} landed the blow. The ${monster.name} is now dead!`
              : `${item.name} missed — the monster got away!`,
          );

        await itemInteraction.update({
          embeds: [updatedEmbed],
          components: [resultRow],
        });
      });
    }
  });

  collector.on("end", async (collected) => {
    if (collected.size === 0) {
      await interaction.editReply({
        content: `⏳ You missed your chance to act! The ${monster.name} fled.`,
        components: [],
      });
    }
  });
};

export const wrappedHuntCommand = withUser(executeHunt);
