import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../../dynamo";

export async function checkIfUserExists(userId: string): Promise<boolean> {
    const tableName = process.env.NODE_ENV === 'prod'
        ? process.env.DYNAMODB_TABLE_PROD
        : process.env.DYNAMODB_TABLE_DEV;

    const params = {
        TableName: tableName,
        Key: {
            userId: { S: userId }
        }
    };

    try {
        const command = new GetItemCommand(params);
        const result = await dynamoDBClient.send(command);
        return !!result.Item;
    } catch (error) {
        console.error("Error checking if user exists:", error);
        return false;
    }
}
