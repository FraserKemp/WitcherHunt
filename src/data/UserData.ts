import { UserData } from "../types/UserTypes/UserTypes";

export const defaultUserData: UserData = {
  stats: {
    kills: 0,
    captures: 0,
    huntsCompleted: 0,
  },
  inventory: {
    monsterHeads: {}, // Initially empty map
    capturedMonsters: {}, // Initially empty map
    items: {
      rusty_dagger: 10,
      steel_sword: 10,
      silver_sword: 5,
      binding_stone: 1,
    },
  },
  createdAt: new Date().toISOString(),
  lastSeen: new Date().toISOString(),
};

export const getDynamoUserData = (userId: string, username: string) => ({
  userId: { S: userId }, // userId as a string
  username: { S: username },
  stats: {
    M: {
      kills: { N: String(defaultUserData.stats.kills) }, // kills as a number
      captures: { N: String(defaultUserData.stats.captures) }, // captures as a number
      huntsCompleted: { N: String(defaultUserData.stats.huntsCompleted) }, // huntsCompleted as a number
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
          rusty_dagger: {
            N: String(defaultUserData.inventory.items.rusty_dagger),
          }, // nets as a number
          steel_sword: {
            N: String(defaultUserData.inventory.items.steel_sword),
          },
          silver_sword: {
            N: String(defaultUserData.inventory.items.silver_sword),
          },
          binding_stone: {
            N: String(defaultUserData.inventory.items.binding_stone),
          },
        },
      },
    },
  },
  createdAt: { S: defaultUserData.createdAt }, // createdAt as a string
  lastSeen: { S: defaultUserData.lastSeen }, // lastSeen as a string
});
