import { KillItem, killItems } from "../../Enums/Items";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
} from "discord.js";
import { Monster } from "../../types/MonsterTypes/MonsterTypes";
import { UserData } from "../../types/UserTypes/UserTypes";
import { handleKilledMonster } from "./handleKilledMonster";
import { getAvailableItems } from "../commandUtils/getAvaliableItems";

export const huntAttack = async (
  embed: EmbedBuilder,
  btnInteraction: ButtonInteraction,
  interaction: CommandInteraction,
  userData: UserData,
  monster: Monster,
): Promise<void> => {
  const availableItems = getAvailableItems(userData);

  if (availableItems.length === 0) {
    await btnInteraction.update({
      content: "You don’t have any items to attack with!",
      components: [],
    });
    return;
  }

  const buttons = availableItems.map((item) =>
    new ButtonBuilder()
      .setCustomId(`${item.id}`)
      .setEmoji(item.emoji)
      .setStyle(ButtonStyle.Secondary),
  );

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons);

  await btnInteraction.update({
    components: [row],
  });

  const itemCollector = btnInteraction.message.createMessageComponentCollector({
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

    if (killed) {
      await handleKilledMonster(monster);
    }

    const resultButton = new ButtonBuilder()
      .setCustomId("result")
      .setEmoji(killed ? "✅" : "❌")
      .setStyle(ButtonStyle.Secondary);

    const resultRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      resultButton,
    );

    const updatedEmbed = EmbedBuilder.from(embed)
      .setAuthor({
        name: "Monster Defeated! here",
        iconURL: killed
          ? "https://raw.githubusercontent.com/FraserKemp/WitcherHunt/main/src/assets/images/witcher_success.png"
          : "https://raw.githubusercontent.com/FraserKemp/WitcherHunt/main/src/assets/images/witcher_fail.png",
      })
      .setTitle(killed ? "Monster Defeated!" : "Monster Escaped!")
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
};
