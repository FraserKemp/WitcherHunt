import { UserData } from "../types/UserTypes/UserTypes";

export const defaultUserData: UserData = {
  stats: {
    kills: 0,
    captures: 0,
    huntsCompleted: 0,
    totalHunts: 0,
  },
  inventory: {
    monsterHeads: {}, // This may need to be configured better later
    capturedMonsters: {},
    items: {
      killItems: {
        rusty_dagger: 10,
        runed_steel_blades: 10,
        silver_sword: 5,
        binding_stone: 1,
      },
      captureItems: {
        dimeritium_trap: 10,
        moon_dust: 10,
        snare_trap: 5,
        yrden_trap: 1,
      },
    },
  },
  createdAt: new Date().toISOString(),
  lastSeen: new Date().toISOString(),
};

export const getDynamoUserData = (userId: string, username: string) => ({
  userId: { S: userId },
  username: { S: username },
  stats: {
    M: {
      kills: { N: String(defaultUserData.stats.kills) }, // kills as a number
      captures: { N: String(defaultUserData.stats.captures) },
      huntsCompleted: { N: String(defaultUserData.stats.huntsCompleted) },
      totalHunts: { N: String(defaultUserData.stats.totalHunts) },
    },
  },
  inventory: {
    M: {
      monsterHeads: {
        M: Object.fromEntries(
          Object.entries(defaultUserData.inventory.monsterHeads).map(
            ([key, value]) => [
              key,
              { N: String(value) }, // Convert the number into a string representation
            ],
          ),
        ),
      },
      capturedMonsters: {
        M: Object.fromEntries(
          Object.entries(defaultUserData.inventory.capturedMonsters).map(
            ([key, value]) => [
              key,
              {
                M: {
                  level: { N: String(value.level) },
                  xp: { N: String(value.xp) },
                },
              },
            ],
          ),
        ),
      },
      items: {
        M: {
          killItems: {
            M: {
              rusty_dagger: {
                N: String(
                  defaultUserData.inventory.items.killItems.rusty_dagger,
                ),
              },
              runed_steel_blades: {
                N: String(
                  defaultUserData.inventory.items.killItems.runed_steel_blades,
                ),
              },
              silver_sword: {
                N: String(
                  defaultUserData.inventory.items.killItems.silver_sword,
                ),
              },
              binding_stone: {
                N: String(
                  defaultUserData.inventory.items.killItems.binding_stone,
                ),
              },
            },
          },
          captureItems: {
            M: {
              dimeritium_trap: {
                N: String(
                  defaultUserData.inventory.items.captureItems.dimeritium_trap,
                ),
              },
              moon_dust: {
                N: String(
                  defaultUserData.inventory.items.captureItems.moon_dust,
                ),
              },
              snare_trap: {
                N: String(
                  defaultUserData.inventory.items.captureItems.snare_trap,
                ),
              },
              yrden_trap: {
                N: String(
                  defaultUserData.inventory.items.captureItems.yrden_trap,
                ),
              },
            },
          },
        },
      },
    },
  },
  createdAt: { S: defaultUserData.createdAt }, // createdAt as a string
  lastSeen: { S: defaultUserData.lastSeen }, // lastSeen as a string
});
