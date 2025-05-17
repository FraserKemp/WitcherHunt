import { dynamoDBClient } from "../../dynamo";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { assertIsError } from "../../utils/assertIsError";

const TABLE_NAME =
  process.env.NODE_ENV === "prod"
    ? process.env.DYNAMODB_TABLE_PROD
    : process.env.DYNAMODB_TABLE_DEV;

export const decrementUserInteractionItem = async (
  userId: string,
  itemName: string,
): Promise<void> => {
  try {
    const command = new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: marshall({ userId }),
      UpdateExpression:
        "SET #inventory.#items.#item = #inventory.#items.#item - :one",
      ConditionExpression:
        "attribute_exists(#inventory.#items.#item) AND #inventory.#items.#item >= :one",
      ExpressionAttributeNames: {
        "#inventory": "inventory",
        "#items": "items",
        "#item": itemName,
      },
      ExpressionAttributeValues: {
        ":one": { N: "1" },
      },
      ReturnValues: "NONE",
    });

    await dynamoDBClient.send(command);
  } catch (error) {
    assertIsError(error);
    if (error.name === "ConditionalCheckFailedException") {
      console.error("Item does not exist or is already at 0.");
    } else {
      console.error("Error decrementing item:", error);
    }
    throw error;
  }
};
