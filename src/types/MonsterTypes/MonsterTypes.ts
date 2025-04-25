export type MonsterRarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Super Rare"
  | "Legendary"
  | "Cursed"
  | "Deranged";

export type MonsterType =
  | "Cursed"
  | "Relict"
  | "Elementa"
  | "Specter"
  | "Necrophage"
  | "Draconid"
  | "Vampire"
  | "Insectoid"
  | "Beast"
  | "Hybrid"
  | "Ogroid";

export type Region =
  | "Velen"
  | "Skellige"
  | "Kaer Morhen"
  | "Novigrad"
  | "Toussaint"
  | "White Orchard"
  | "Oxenfurt"
  | "Nilfgaard"
  | "Redania"
  | "Undiscovered";

type MonsterLoot = {
  head?: {
    baseValue: number;
    name: string; // e.g. "Warg Head"
    description?: string;
    imageUrl?: string;
    dropRate?: number; // % chance to get head on kill
  };
};

export interface Monster {
  id: string;
  name: string;
  rarity: MonsterRarity;
  price: number;
  countInGame: number;
  baseStats: {
    attack: number;
    defense: number;
    hp: number;
    speed: number;
  };
  type: MonsterType[];
  region: Region; // Where it originates from (affects currency)
  loot: MonsterLoot;
}
