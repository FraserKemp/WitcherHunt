import {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ButtonInteraction,
  EmbedBuilder,
  ColorResolvable,
} from "discord.js";
import { rollRarity } from "../../utils/rollRarity";
import { withUser } from "../commandUserWrapper";
import { getMonstersByRarity } from "../../database/Monsters/getMonstersByRarity";
import { UserData } from "../../types/UserTypes/UserTypes";
import { ColorConst } from "../../constants/ColorConst";
import { huntAttack } from "./huntResponses/huntAttack/huntAttack";

export const huntCommand = new SlashCommandBuilder()
  .setName("hunt")
  .setDescription("Go on a monster hunt!");

const executeHunt = async (
  interaction: CommandInteraction,
  userData: UserData,
) => {
  const rarity = rollRarity();
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

  // TODO make different descriptions based on the monster type
  // TODO: pull into a function to which takes user data and returns the user items.
  // Update to contain catch items and attack items so we know what items we have so we can make a decision if we want to catch or not
  const userItems = userData?.inventory?.items;
  const footerTextItems = `=========Items left=========
Rusty dagger: ${userItems.rusty_dagger} | Runed Steel Blades ${userItems.runed_steel_blades}
Silver sword: ${userItems.silver_sword} | Binding Stone: ${userItems.binding_stone}`;

  const color = ColorConst[specialRarity ?? rarity.monsterRarity];

  // create the monster name, so we can reference is from the assets folder
  const monsterName = monster.name.toLowerCase().replace(/\s+/g, "_");

  // TODO update user region once travelling is implemented

  const embed = new EmbedBuilder()
    .setTitle("A wild monster appeared!")
    .setDescription("This beast darkens the skies. Will you attack or trap it?")
    .setImage(`attachment://${monsterName}_body.png`)
    .setFooter({
      text: `Rarity: ${
        specialRarity ?? rarity.monsterRarity
      }\nType: Draconid\nCurrent region: Novigrad\nMonster region: ${
        monster.region
      }\n\n${footerTextItems}\n\nChoose an action`,
    })
    .setColor(color as ColorResolvable);

  // TODO implement catching

  // Sets up the button actions we can use on the embed. This is used later to handle which interaction the user is doing
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("attack")
      .setLabel("Attack️")
      .setStyle(ButtonStyle.Secondary),
    // new ButtonBuilder()
    //   .setCustomId("capture")
    //   .setLabel("🪢")
    //   .setStyle(ButtonStyle.Secondary),
  );

  const monsterNameAndRarity = `${specialRarity ?? ""}${monster.name}`;

  // This handles showing the image and the 'embed' text we set up above and the buttons 'row' we set up above
  await interaction.reply({
    content: `<:geralt_character:1368266728538374255> **${username}** hunted a wild **${monsterNameAndRarity}!**\nClick any of <:rusty_dagger:1366923079015465000> \`rd\`, <:runed_steel_blades:1373242183586549884> \`rsb\`,<:silver_sword:1366924519440384020> \`ss\`,\n<:binding_stone:1366924536854876271> \`bs\` to hunt the monster`,
    embeds: [embed],
    components: [row],
    files: [
      {
        attachment: `src/assets/images/${monsterName}_body.png`,
        name: `${monsterName}_body.png`,
      },
    ],
  });

  const message = await interaction.fetchReply();

  // Create a listener to trigger the correct code flow once the user has selected.
  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 15000, // 15s window to choose
    max: 1,
  });

  collector.on("collect", async (btnInteraction: ButtonInteraction) => {
    if (btnInteraction.user.id !== interaction.user.id) {
      await btnInteraction.reply({
        content: "This isn’t your hunt!",
      });
      return;
    }

    if (btnInteraction.customId === "attack") {
      await huntAttack(embed, btnInteraction, interaction, userData, monster);
    } else if (btnInteraction.customId === "capture") {
      // TODO: CB implement catching here
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
