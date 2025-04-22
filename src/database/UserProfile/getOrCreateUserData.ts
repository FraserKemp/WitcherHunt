import {dynamoDBClient} from '../../dynamo';
import {GetItemCommand} from '@aws-sdk/client-dynamodb';
import {createNewProfile} from './createNewProfile';
import {assertIsError} from "../../utils/assertIsError";
import {UserData} from "../../types/UserTypes";
import {unmarshall} from "@aws-sdk/util-dynamodb";

type getOrCreateUserDataError = {
    status: 'error',
    success: false,
    errorMessage: string;
}
type getOrCreateUserDataSuccess = {
    status: 'success',
    success: true,
    data: UserData,
}

type getOrCreateUserData = getOrCreateUserDataSuccess | getOrCreateUserDataError;

export const getOrCreateUserData = async (userId: string, username:string): Promise<getOrCreateUserData> =>  {
    const tableName = process.env.NODE_ENV === 'prod'
        ? process.env.DYNAMODB_TABLE_PROD
        : process.env.DYNAMODB_TABLE_DEV;

    const params = {
        TableName: tableName,
        Key: {
            userId: { S: userId },
        },
    };

    try {
        console.log(`Searching for User ${userId} record in DB`);
            // Check if the user already exists in the database
            const command = new GetItemCommand(params);
            const result = await dynamoDBClient.send(command);
            const item = result.Item
            if (item) {
                // we don't want the data in the dynamo format so we will unmarshall it.
                const data = unmarshall(item) as UserData;
                // If user exists, return the data
                console.log(`User, id:${userId}, found in the database, data: ${JSON.stringify(data)}`);
                return {success: true, status: 'success', data: data };
            } else {
                // If not found, create new user with default data
                console.log(`User, id:${userId}, not found. Creating new user.`);
                // Store new user data and return it
                const response = await createNewProfile(userId, username);
                if(response.status == 'error') {
                    console.error(`Call ran and didnt succeed, code:${response.status}`);
                    throw new Error(response.errorMessage)
                }
                return {success: true, status: 'success', data: response.data};
            }
    } catch (error) {
        assertIsError(error)
        console.error('Error retrieving or creating user data:', error);
        return {success: false, status: 'error', errorMessage: error.message};
    }
}

