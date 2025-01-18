import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb"

export function GET(request: Request) {
    const dbClient = new DynamoDBClient({ region: "us-east-2" });
    const docClient = DynamoDBDocumentClient.from(dbClient);

    const params = {
        TableName: "AboutMe",
        Key: {
            id: "about-me"
        }
    }

  }