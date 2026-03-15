import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  const body = JSON.parse(event.body);

  const params = {
    TableName: "CoffeeInventory",
    Item: {
      coffeeId: body.coffeeId,
      name: body.name,
      price: body.price,
      stock: body.stock
    }
  };

  await dynamodb.send(new PutCommand(params));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify({
      message: "Coffee added successfully"
    })
  };
};