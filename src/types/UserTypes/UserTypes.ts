interface Items {
  rusty_dagger: number;
  steel_sword: number;
  silver_sword: number;
  binding_stone: number;
}

type Companion = {
  monsterId: string;
  nickname?: string;
  level: number;
  experience: number;
  equipped?: {
    itemId: string;
  };
  statsOverride?: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
};

type MonsterStatsOverride = {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
};

type CapturedMonster = {
  count: number; // number of captured monsters
  level: number; // monster's current level
  xp: number; // experience points for leveling up
  equippedItems: string[]; // array of item IDs equipped to the monster
  statsOverride?: MonsterStatsOverride; // optional overrides for stats
};

interface Inventory {
  monsterHeads: Record<string, number>; // monsterId -> quantity
  capturedMonsters: Record<string, CapturedMonster>;
  items: Items;
}

interface Stats {
  kills: number;
  captures: number;
  huntsCompleted: number;
}

export interface UserData {
  stats: Stats;
  inventory: Inventory;
  companion?: Companion;
  roles?: string[];
  createdAt: string; // ISO string format (e.g., "2023-04-21T12:34:56.789Z")
  lastSeen: string; // ISO string format

  // TODO: For later: Implement a trophy room for each user. May be worth its own table linked to the user id
  // trophyRoom: Set<string>;
}
