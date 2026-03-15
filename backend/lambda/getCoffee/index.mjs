import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  const params = {
    TableName: "CoffeeInventory"
  };

  try {

    const data = await dynamo.send(new ScanCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };

  } catch (error) {

    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };

  }

};