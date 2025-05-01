import { MonsterRarity } from "../types/MonsterTypes/MonsterTypes";

export type KillItem = {
  id: string;
  name: string;
  description?: string;
  cost: number;
  emoji: { id: string; name: string };
  killChances: Record<MonsterRarity, number>;
};

export const killItems: Record<string, KillItem> = {
  rusty_dagger: {
    id: "rusty_dagger",
    name: "Rusty Dagger",
    description:
      "An old, barely sharp dagger. Better than nothing — but not by much.",
    cost: 10,
    killChances: {
      Common: 70, // 70% kill chance against common monsters
      Uncommon: 60, // 60% against uncommon monsters
      Rare: 20, // 20% against rare monsters
      ["Super Rare"]: 5, // 5% against super rare monsters
      Legendary: 0, // Cannot kill legendary monsters
      Cursed: 0, // Cannot kill cursed monsters
      Deranged: 0, // Cannot kill deranged monsters
    },
    emoji: { id: "1366923079015465000", name: "rusty_dagger" },
  },
  steel_sword: {
    id: "steel_sword",
    name: "Steel Sword",
    description: "A reliable witcher's steel sword.",
    cost: 75,
    killChances: {
      Common: 80, // 80% kill chance for common
      Uncommon: 70, // 70% kill chance for uncommon
      Rare: 45, // 45% kill chance for rare
      ["Super Rare"]: 20, // 20% kill chance for super rare
      Legendary: 5, // 5% kill chance for legendary
      Cursed: 2, // 2% chance to kill a cursed (shiny) monster
      Deranged: 0, // No chance to kill deranged
    },
    emoji: { id: "1366923123621892216", name: "steel_sword" },
  },
  silver_sword: {
    id: "silver_sword",
    name: "Silver Sword",
    description: "A silver master crafted blade made of pure silver.",
    cost: 150,
    killChances: {
      Common: 90, // 90% kill chance for common
      Uncommon: 85, // 85% for uncommon
      Rare: 75, // 75% for rare
      ["Super Rare"]: 50, // 50% for super rare
      Legendary: 15, // 15% for legendary
      Cursed: 5, // 5% for cursed (shiny)
      Deranged: 1, // 1% for deranged
    },
    emoji: { id: "1366924519440384020", name: "silver_sword" },
  },
  binding_stone: {
    id: "binding_stone",
    name: "Binding Stone",
    description:
      "A mythical relic that seals a monster's fate the moment it's invoked.",
    cost: 1000,
    killChances: {
      Common: 100, // 100% guaranteed kill
      Uncommon: 100,
      Rare: 100,
      ["Super Rare"]: 100,
      Legendary: 100,
      Cursed: 100,
      Deranged: 70, // 70% for deranged
    },
    emoji: { id: "1366924536854876271", name: "binding_stone" },
  },
};
