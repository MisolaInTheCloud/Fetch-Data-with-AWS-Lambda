// index.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" }); 
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
  const userId = String(event.userId);

  const params = {
    TableName: "UserData",
    Key: { userId },
  };

  try {
    const command = new GetCommand(params);
    const data = await ddbDocClient.send(command);

    if (data.Item) {
      console.log("User data retrieved:", data.Item);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }
  } catch (err) {
    console.error("Error retrieving user:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
