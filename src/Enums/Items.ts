import { MonsterRarity } from "../types/MonsterTypes/MonsterTypes";

type Item = {
  id: string;
  name: string;
  description?: string;
  cost: number;
  emoji: { id: string; name: string };
};

export type KillItem = Item & {
  killChances: Record<MonsterRarity, number>;
};

export type CaptureItem = Item & {
  captureChances: Record<MonsterRarity, number>;
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
  runed_steel_blades: {
    id: "runed_steel_blades",
    name: "Runed Steel Blades",
    description:
      "Masterfully forged steel swords etched with monster-binding runes. Trusted by Witchers in battle against lesser foes.",
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
    emoji: { id: "1373242183586549884", name: "runed_steel_blades" },
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

export const captureItems: Record<string, CaptureItem> = {
  snare_trap: {
    id: "snare_trap",
    name: "Snare Trap",
    description:
      "A basic rope-and-pulley snare. Effective against weak or distracted monsters.",
    cost: 10,
    captureChances: {
      Common: 70, // 70% capture chance against common monsters
      Uncommon: 60, // 60% against uncommon monsters
      Rare: 20, // 20% against rare monsters
      ["Super Rare"]: 5, // 5% against super rare monsters
      Legendary: 0, // Cannot capture legendary monsters
      Cursed: 0, // Cannot capture cursed monsters
      Deranged: 0, // Cannot capture deranged monsters
    },
    emoji: { id: "1373250975086674042", name: "snare_trap" },
  },
  moon_dust: {
    id: "moon_dust",
    name: "Moon Dust",
    description:
      "A powdered alchemical mixture that interferes with a monster's escape instincts.",
    cost: 75,
    captureChances: {
      Common: 80, // 80% capture chance for common
      Uncommon: 70, // 70% capture chance for uncommon
      Rare: 45, // 45% kill chance for rare
      ["Super Rare"]: 20, // 20% capture chance for super rare
      Legendary: 5, // 5% kill chance for legendary
      Cursed: 2, // 2% chance to capture a cursed (shiny) monster
      Deranged: 0, // No chance to capture deranged
    },
    emoji: { id: "1373253226513563668", name: "moon_dust" },
  },
  yrden_trap: {
    id: "yrden_trap",
    name: "Yrden Trap",
    description:
      "A magical glyph that slows monsters and weakens their resistance to capture.",
    cost: 150,
    captureChances: {
      Common: 90, // 90% capture chance for common
      Uncommon: 85, // 85% for uncommon
      Rare: 75, // 75% for rare
      ["Super Rare"]: 50, // 50% for super rare
      Legendary: 15, // 15% for legendary
      Cursed: 5, // 5% for cursed (shiny)
      Deranged: 1, // 1% for deranged
    },
    emoji: { id: "1373253849330094121", name: "yrden_trap" },
  },
  dimeritium_trap: {
    id: "dimeritium_trap",
    name: "Dimeritium Trap",
    description:
      "Forged from dimeritium alloy, this trap suppresses magical abilities, making even the strongest monsters capturable.",
    cost: 1000,
    captureChances: {
      Common: 100, // 100% guaranteed kill
      Uncommon: 100,
      Rare: 100,
      ["Super Rare"]: 100,
      Legendary: 100,
      Cursed: 100,
      Deranged: 70, // 70% for deranged
    },
    emoji: { id: "1373254310892142632", name: "dimeritium_trap" },
  },
};
