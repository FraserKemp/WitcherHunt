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
import { Monster, MonsterRarity } from "../../types/MonsterTypes/MonsterTypes";
import { getMonstersByRarity } from "../../database/Monsters/getMonstersByRarity";

export const commonMonsters: Monster[] = [
  {
    id: "001",
    name: "Drowner",
    rarity: "Common",
    price: 50,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Velen",
    loot: {},
  },
  {
    id: "002",
    name: "Ghoul",
    rarity: "Common",
    price: 55,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "White Orchard",
    loot: {},
  },
  {
    id: "003",
    name: "Wolf",
    rarity: "Common",
    price: 45,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
    loot: {},
  },
  {
    id: "004",
    name: "Wild Dog",
    rarity: "Common",
    price: 40,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Novigrad",
    loot: {},
  },
  {
    id: "005",
    name: "Nekker",
    rarity: "Common",
    price: 60,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Ogroid"],
    region: "Velen",
    loot: {},
  },
  {
    id: "006",
    name: "Endrega Worker",
    rarity: "Common",
    price: 65,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Insectoid"],
    region: "Velen",
    loot: {},
  },
  {
    id: "007",
    name: "Rotfiend",
    rarity: "Common",
    price: 70,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Novigrad",
    loot: {},
  },
  {
    id: "008",
    name: "Water Hag",
    rarity: "Common",
    price: 75,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Necrophage"],
    region: "Velen",
    loot: {},
  },
  {
    id: "009",
    name: "Bear",
    rarity: "Common",
    price: 80,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
    loot: {},
  },
  {
    id: "010",
    name: "Warg",
    rarity: "Common",
    price: 85,
    countInGame: 0,
    baseStats: { attack: 0, defense: 0, hp: 0, speed: 0 },
    type: ["Beast"],
    region: "Skellige",
    loot: {},
  },
];

type AttackResult = {
  success: boolean;
  roll: number;
  threshold: number;
  message: string;
};

export const resolveAttack = (monster: Monster): AttackResult => {
  const roll = Math.floor(Math.random() * 100);
  console.log("Attack roll: ", roll);
  const thresholdMap: Record<string, number> = {
    Common: 70,
    Uncommon: 60,
    Rare: 37,
    "Super Rare": 20,
    Legendary: 5,
    Cursed: 4,
    Deranged: 3,
  };
  const threshold = thresholdMap[monster.rarity] ?? 50;

  const success = roll >= threshold;
  const message = success
    ? `💥 You killed the ${monster.name} monster! (Roll: ${roll} / Needed: ${threshold})`
    : `❌ The ${monster.name} monster dodged your attack! (Roll: ${roll} / Needed: ${threshold})`;

  return { success, roll, threshold, message };
};

export const huntCommand = new SlashCommandBuilder()
  .setName("hunt")
  .setDescription("Go on a monster hunt!");

const executeHunt = async (interaction: CommandInteraction) => {
  const rarity: MonsterRarity = rollRarity();
  console.log(rarity, "RARITY HERE");
  const monstersForRarity = getMonstersByRarity(rarity);

  // Get a monster of that rarity
  const possibleMonsters = commonMonsters.filter(
    (m) => m.rarity.toLocaleLowerCase() === rarity.toLocaleLowerCase(),
  );
  if (possibleMonsters.length === 0) {
    await interaction.reply(`No monsters found for rarity: ${rarity}`);
    return;
  }

  const monster =
    possibleMonsters[Math.floor(Math.random() * possibleMonsters.length)];

  // TODO make this more similar to PokeMeow -> show how many items you have and other bits of information like the rarity.

  const embed = new EmbedBuilder()
    .setColor(0x00ae86)
    .setAuthor({
      name: "Some name",
      iconURL: "https://i.imgur.com/AfFp7pu.png",
      url: "https://discord.js.org",
    })
    .setTitle("🐾 A wild Drowner has appeared!")
    .setDescription("This creature seems aggressive... What will you do?")
    .setThumbnail("https://example.com/drowner.gif") // or `.setImage()` for bigger image
    .addFields(
      {
        name: "",
        value: `Rarity: ${rarity}\nRegion: Velen`,
        inline: false,
      },
      {
        name: "",
        value:
          "======Items left======\nRusty dagger: 10 | Steel sword 19\nSilver sword:1 | Binding Stone: 0",
        inline: false,
      },
    )
    .setFooter({ text: "Use buttons below to interact!" });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("attack")
      .setLabel("⚔️")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("capture")
      .setLabel("🪢")
      .setStyle(ButtonStyle.Secondary),
  );

  await interaction.reply({
    content: `👹 A wild **${monster.name}** appeared! (Rarity: ${monster.rarity})\nChoose your action:`,
    embeds: [embed],
    components: [row],
    ephemeral: false,
  });

  // Create a message component collector for this interaction
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
      const result = resolveAttack(monster);

      await btnInteraction.update({
        content: result.message,
        components: [],
      });
    }

    if (btnInteraction.customId === "capture") {
      await btnInteraction.update({
        content: `🪢 You tried to capture **${monster.name}** (${monster.rarity}) — capture logic coming soon!`,
        components: [],
      });
    }
  });

  collector.on("end", async (collected) => {
    if (collected.size === 0) {
      await interaction.editReply({
        content: `⏳ You missed your chance to act! The **${monster.name}** escaped.`,
        components: [],
      });
    }
  });
};

export const wrappedHuntCommand = withUser(executeHunt);
