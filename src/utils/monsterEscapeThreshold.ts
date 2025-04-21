// For now, simulate user and monster rolls
export const monsterEscapeThreshold = (rarity: string): number => {
    const thresholds: Record<string, number> = {
        Common: 85,
        Uncommon: 75,
        Rare: 55,
        'Super Rare': 35,
        Legendary: 15,
        Shiny: 20,     // extra resistance
        Deranged: 5    // ultra resistance
    };
    return thresholds[rarity] ?? 50;
}