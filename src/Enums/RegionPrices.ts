import { Monster } from "../types/MonsterTypes/MonsterTypes";

const regionHeadPrices: Record<string, Record<string, number>> = {
  Skellige: {
    "010": 120, // Warg head
    "020": 140, // Noonwraith head
  },
  Velen: {
    "010": 90,
    "020": 160,
  },
};

// Potential but this may be useless in the future
function getHeadSellValue(monster: Monster, region: string): number {
  const base = monster.loot.head.baseValue;
  const regionModifier = region === monster.region ? 1.2 : 0.8;
  return Math.floor(base * regionModifier);
}
