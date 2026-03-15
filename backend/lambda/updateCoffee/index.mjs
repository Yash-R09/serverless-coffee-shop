import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamodb = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  const body = JSON.parse(event.body);

  const params = {
    TableName: "CoffeeInventory",
    Key: {
      coffeeId: body.coffeeId
    },
    UpdateExpression: "set stock = :s",
    ExpressionAttributeValues: {
      ":s": body.stock
    },
    ReturnValues: "UPDATED_NEW"
  };

  await dynamodb.send(new UpdateCommand(params));

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify({
      message: "Coffee updated successfully"
    })
  };
};