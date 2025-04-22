import {UserData} from "../../types/UserTypes";
import {GetItemCommand} from "@aws-sdk/client-dynamodb";
import {dynamoDBClient} from "../../dynamo";
import {unmarshall} from "@aws-sdk/util-dynamodb";
import {assertIsError} from "../../utils/assertIsError";

// TODO make this generic as we will always have this similar structure.
type getUserProfileDataError = {
    status: 'error',
    success: false,
    errorMessage: string;
}
type getUserProfileDataSuccess = {
    status: 'success',
    success: true,
    data: UserData,
}

type getUserProfileData = getUserProfileDataSuccess | getUserProfileDataError;

export const getUserProfile = async (userId: string): Promise<getUserProfileData> => {
    const tableName = process.env.NODE_ENV === 'prod'
        ? process.env.DYNAMODB_TABLE_PROD
        : process.env.DYNAMODB_TABLE_DEV;

    try {
        const params = {
            TableName: tableName,
            Key: {
                userId: { S: userId },
            },
        };

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
            throw new Error("Could not find user data");
        }
    } catch (error) {
        assertIsError(error)
        console.error('Error retrieving user data:', error);
        return {success: false, status: 'error', errorMessage: error.message};
    }
}