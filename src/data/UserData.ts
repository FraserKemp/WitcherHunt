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
    consumables: {
      nets: 0,
      silverBombs: 0,
      godEssence: 0,
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
      consumables: {
        M: {
          nets: { N: String(defaultUserData.inventory.consumables.nets) }, // nets as a number
        },
      },
    },
  },
  createdAt: { S: defaultUserData.createdAt }, // createdAt as a string
  lastSeen: { S: defaultUserData.lastSeen }, // lastSeen as a string
});
