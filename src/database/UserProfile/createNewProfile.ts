import { dynamoDBClient } from '../../dynamo';  // Import DynamoDB client
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import {UserData} from "../../types/UserTypes";
import {assertIsError} from "../../utils/assertIsError";


export const defaultUserData: UserData = {
    stats: {
        kills: 0,
        captures: 0,
        huntsCompleted: 0,
    },
    inventory: {
        monsterHeads: {},  // Initially empty map
        capturedMonsters: {},  // Initially empty map
        consumables: {
            nets: 0,
            silverBombs: 0,
            godEssence: 0,
        }
    },
    createdAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
};


type newProfileResponseError = {
    status: 'error',
    success: boolean,
    errorMessage: string;
}
type newProfileResponseSuccess = {
    status: 'success',
    success: boolean,
    data: UserData,
}

type newProfileResponse = newProfileResponseSuccess | newProfileResponseError

export const createNewProfile  = async (userId: string, username: string): Promise<newProfileResponse> => {
    const tableName = process.env.NODE_ENV === 'prod'
        ? process.env.DYNAMODB_TABLE_PROD
        : process.env.DYNAMODB_TABLE_DEV;

    const dataToSend = {
        userId: { S: userId },  // userId as a string
        username: { S: username },
        stats: {
            M: {
                kills: { N: String(defaultUserData.stats.kills) },  // kills as a number
                captures: { N: String(defaultUserData.stats.captures) },  // captures as a number
                huntsCompleted: { N: String(defaultUserData.stats.huntsCompleted) },  // huntsCompleted as a number
            }
        },
        inventory: {
            M: {
                monsterHeads: { M: defaultUserData.inventory.monsterHeads },  // monsterHeads as a map {}
                capturedMonsters: { M: defaultUserData.inventory.capturedMonsters },  // capturedMonsters as a map {}
                consumables: {
                    M: {
                        nets: { N: String(defaultUserData.inventory.consumables.nets) },  // nets as a number
                    }
                }
            }
        },
        createdAt: { S: defaultUserData.createdAt },  // createdAt as a string
        lastSeen: { S: defaultUserData.lastSeen },  // lastSeen as a string
    };

    const params = {
        TableName: tableName,
        Item: dataToSend
    };

    try {
        const command = new PutItemCommand(params);
        const response = await dynamoDBClient.send(command);
        console.log(`User ${userId} data stored in ${tableName}`);
        if(response.$metadata.httpStatusCode !== 200) {
            return { status: 'error', success: false, errorMessage: `Failed to create new user code: ${response.$metadata.httpStatusCode}`};
        }
        console.log(`storeUserData: Success creating user returning data`);
        return { status: 'success', success: true, data: defaultUserData};
    } catch (error) {
        assertIsError(error)
        console.error('Error storing user data:', error);
        return { status: 'error', success: false, errorMessage: error.message };
    }
}
