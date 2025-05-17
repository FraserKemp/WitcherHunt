import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "../../dynamo";
import { StatKey } from "../../types/UserTypes/UserStatTypes";

const TABLE_NAME =
  process.env.NODE_ENV === "prod"
    ? process.env.DYNAMODB_TABLE_PROD
    : process.env.DYNAMODB_TABLE_DEV;

export const incrementSingleUserStat = async (
  userId: string,
  statKey: StatKey,
): Promise<void> => {
  try {
    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ userId }),
      UpdateExpression:
        "SET #stats.#key = if_not_exists(#stats.#key, :zero) + :one",
      ExpressionAttributeNames: {
        "#stats": "stats",
        "#key": statKey,
      },
      ExpressionAttributeValues: {
        ":one": { N: "1" },
        ":zero": { N: "0" },
      },
    });

    await dynamoDBClient.send(command);
    console.log(`Incremented ${statKey} for user ${userId}`);
  } catch (err) {
    console.error("Failed to increment user stat:", err);
    throw err;
  }
};

export const incrementMultipleUserStats = async (
  userId: string,
  statKeys: StatKey[],
): Promise<void> => {
  try {
    // Dynamically building an UpdateExpression, for each stat, for DynamoDB
    const updateParts = statKeys.map(
      (key, idx) =>
        `#stats.#key${idx} = if_not_exists(#stats.#key${idx}, :zero) + :one`,
    );

    const expressionAttributeNames: Record<string, string> = {
      "#stats": "stats",
    };

    statKeys.forEach((key, idx) => {
      expressionAttributeNames[`#key${idx}`] = key;
    });

    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ userId }),
      UpdateExpression: `SET ${updateParts.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: {
        ":one": { N: "1" },
        ":zero": { N: "0" },
      },
    });

    await dynamoDBClient.send(command);
    console.log(
      `Incremented stats [${statKeys.join(", ")}] for user ${userId}`,
    );
  } catch (err) {
    console.error("Failed to increment user stats:", err);
    throw err;
  }
};
