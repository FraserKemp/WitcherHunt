export const rollRarity = (): string => {
    const roll = Math.random() * 100;
    console.log('Rarity roll: ', roll)
    if (roll <= 0.1) return 'Deranged';
    if (roll <= 1.0) return 'Shiny';
    if (roll <= 5.0) return 'Legendary';
    if (roll <= 25.0) return 'Super Rare';
    if (roll <= 62.0) return 'Rare';
    if (roll <= 88.0) return 'Uncommon';
    return 'Common';
}
