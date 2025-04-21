interface Consumables {
    nets: number;
    silverBombs: number;
    godEssence: number;
}

interface Inventory {
    monsterHeads: { [key: string]: any };  // Use a map of strings to hold monster heads (can store more information later)
    capturedMonsters: { [key: string]: any };  // Use a map of strings for captured monsters (can store more information later)
    consumables: Consumables;
}

interface Stats {
    kills: number;
    captures: number;
    huntsCompleted: number;
}

export interface UserData {
    stats: Stats;
    inventory: Inventory;
    createdAt: string;  // ISO string format (e.g., "2023-04-21T12:34:56.789Z")
    lastSeen: string;   // ISO string format
}