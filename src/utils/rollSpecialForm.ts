export const rollSpecialForm = () => {
  const roll = Math.random() * 10000; // 0-9999 roll for better precision

  if (roll < 5) return "Deranged"; // 0.05% 1 in 2000
  if (roll < 50) return "Cursed"; // 0.5% 1 in 200

  return "Normal";
};
