import { Monster } from "../../types/MonsterTypes/MonsterTypes";

export const handleKilledMonster = async (monster: Monster) => {
  const guaranteedLoot = [];
  let rareLoot = null;

  // Always drop the head
  if (monster.loot.head && monster.loot.head.dropRate === 1) {
    guaranteedLoot.push(monster.loot.head);
  }

  if (monster.loot.extra && monster.loot.extra.length > 0) {
    const roll = Math.random(); // 0 to 1

    const candidates = monster.loot.extra.filter(
      (item) => roll <= item.dropRate,
    );

    if (candidates.length > 0) {
      // Pick the rarest one
      rareLoot = candidates.reduce((lowest, item) =>
        item.dropRate < lowest.dropRate ? item : lowest,
      );
    }
  }

  console.log(guaranteedLoot, "GUARANTEED LOOT");
  console.log(rareLoot, "RARE LOOT");

  // Bundle the loot
  const drops = [...guaranteedLoot];
  if (rareLoot) drops.push(rareLoot);

  const dropList = drops.map((d) => `• ${d.name}`).join("\n");

  console.log(dropList);

  // updatedEmbed.addFields({
  //   name: "🧳 Loot",
  //   value: dropList || "Nothing but coins and gore.",
  // });
};
