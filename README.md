Notes for flight:

If needed for mocking user profile. I may need to think about how to link it up though.
as I wont be able too call to dynamo DB

// dbMock.ts
export const getOrCreateUserData = async (userId: string) => {
return {
userId,
stats: { kills: 0, captures: 0, huntsCompleted: 0 },
inventory: {
monsterHeads: {},
capturedMonsters: {},
items: { nets: 3, silverBombs: 1, godEssence: 0 },
},
createdAt: new Date().toISOString(),
lastSeen: new Date().toISOString(),
username: 'MockUser',
};
};

export const storeUserData = async (userId: string, data: any) => {
console.log(`[MOCK] Would store data for ${userId}`, data);
return true;
};


const useMockDB = process.env.USE_MOCK_DB === 'true';
import * as realDB from './dynamo';
import * as mockDB from './dbMock';

export const db = useMockDB ? mockDB : realDB;
