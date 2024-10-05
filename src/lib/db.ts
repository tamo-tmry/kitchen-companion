import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  NativeAttributeValue,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamoDb = DynamoDBDocumentClient.from(client);

export const getItemFromDynamoDB = async (userId: string) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    FilterExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };

  try {
    const { Items } = await dynamoDb.send(new ScanCommand(params));
    return Items;
  } catch (error) {
    throw new Error("Failed to get items from DynamoDB");
  }
};

export const addItemToDynamoDB = async <
  T extends Record<string, NativeAttributeValue>
>(
  item: T
) => {
  const params: PutCommandInput = {
    TableName: process.env.DYNAMODB_TABLE_NAME!,
    Item: item,
  };

  try {
    await dynamoDb.send(new PutCommand(params));
  } catch (error) {
    throw new Error("Failed to add item to DynamoDB");
  }
};
