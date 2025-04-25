import { Monster, MonsterRarity } from "../../types/MonsterTypes/MonsterTypes";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../../dynamo";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { assertIsError } from "../../utils/assertIsError";

export const getMonstersByRarity = async (
  rarity: MonsterRarity,
): Promise<ApiResponse<Monster[]>> => {
  try {
    const command = new QueryCommand({
      TableName: "dev_monster_table",
      IndexName: "rarity-index",
      KeyConditionExpression: "rarity = :rarity",
      ExpressionAttributeValues: {
        ":rarity": { S: rarity },
      },
    });

    const result = await dynamoDBClient.send(command);
    if (result.Items) {
      const data =
        result.Items?.map((item) => unmarshall(item) as Monster) ?? [];
      return {
        success: true,
        status: "success",
        data: data,
      };
    }
    return {
      status: "error",
      success: false,
      errorMessage: `No data for rarity ${rarity}`,
    };
  } catch (error) {
    assertIsError(error);
    console.error("Error querying monsters by rarity:", error);
    return {
      status: "error",
      success: false,
      errorMessage: error.message,
    };
  }
};
