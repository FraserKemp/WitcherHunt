import { dynamoDBClient } from "../../dynamo";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { UserData } from "../../types/UserTypes/UserTypes";
import { assertIsError } from "../../utils/assertIsError";
import { defaultUserData, getDynamoUserData } from "../../data/UserData";
import { ApiResponse } from "../../types/CommonTypes";

export const createNewProfile = async (
  userId: string,
  username: string,
): Promise<ApiResponse<UserData>> => {
  const tableName =
    process.env.NODE_ENV === "prod"
      ? process.env.DYNAMODB_TABLE_PROD
      : process.env.DYNAMODB_TABLE_DEV;

  const dataToSend = getDynamoUserData(userId, username);

  const params = {
    TableName: tableName,
    Item: dataToSend,
  };

  try {
    const command = new PutItemCommand(params);
    const response = await dynamoDBClient.send(command);
    console.log(`User ${userId} data stored in ${tableName}`);
    if (response.$metadata.httpStatusCode !== 200) {
      return {
        status: "error",
        success: false,
        errorMessage: `Failed to create new user code: ${response.$metadata.httpStatusCode}`,
      };
    }
    console.log(`storeUserData: Success creating user returning data`);
    return { status: "success", success: true, data: defaultUserData };
  } catch (error) {
    assertIsError(error);
    console.error("Error storing user data:", error);
    return { status: "error", success: false, errorMessage: error.message };
  }
};
