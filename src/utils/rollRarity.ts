import { MonsterRarity } from "../types/MonsterTypes/MonsterTypes";
import { Rarity } from "../Enums/Rarity";

export const rollRarity = (): MonsterRarity => {
  const roll = Math.random() * 100;
  console.log("Rarity roll: ", roll);
  if (roll <= 0.05) return Rarity.DERANGED;
  if (roll <= 0.1) return Rarity.CURSED;
  if (roll <= 1.0) return Rarity.LEGENDARY;
  if (roll <= 25.0) return Rarity.SUPER_RARE;
  if (roll <= 40.0) return Rarity.RARE;
  // if (roll <= 70.0) return "uncommon";
  if (roll <= 100.0) return Rarity.COMMON;
  return "Common";
};
