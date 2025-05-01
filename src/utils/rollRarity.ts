import { MonsterRarity } from "../types/MonsterTypes/MonsterTypes";
import { Rarity } from "../Enums/Rarity";

// 0.00% - 0.05% chance (extremely rare Deranged form)
// if (roll <= 0.05) return Rarity.DERANGED;

// 0.05% - 0.10% chance (extremely rare Cursed form)
// if (roll <= 0.1) return Rarity.CURSED;

type RollRarityResponse = {
  monsterRarity: MonsterRarity;
  specialRarity: MonsterRarity | undefined;
};

export const rollRarity = (): RollRarityResponse => {
  const roll = Math.random() * 100;
  let monsterRarity = Rarity.COMMON;
  console.log("Rarity roll: ", roll.toFixed(4));

  // 0.10% - 1.00% chance (very rare Legendary monster)
  if (roll > 0.1 && roll <= 1.0) monsterRarity = Rarity.LEGENDARY;

  // 1.00% - 5.00% chance (Super Rare monster, ~4% chance)
  if (roll > 1.0 && roll <= 5.0) monsterRarity = Rarity.SUPER_RARE;

  // 5.00% - 25.00% chance (Rare monster, ~20% chance)
  if (roll > 5.0 && roll <= 25.0) monsterRarity = Rarity.RARE;

  // 25.00% - 60.00% chance (Uncommon monster, ~35% chance)
  if (roll > 25.0 && roll <= 60.0) monsterRarity = Rarity.UNCOMMON;

  const specialRoll = Math.random() * 100;
  let specialRarity;

  // 0.00% - 0.05% chance (extremely rare Deranged form 0.05% chance)
  if (specialRoll <= 0.05) specialRarity = Rarity.DERANGED;

  // 0.05% - 0.10% chance (extremely rare Cursed form 0.10% chance)
  if (specialRoll <= 0.1) specialRarity = Rarity.CURSED;

  // 60.00% - 100.00% chance (Common monster, ~40% chance)
  return { monsterRarity: monsterRarity, specialRarity: specialRarity };
};
