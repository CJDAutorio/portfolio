import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import React from "react";

export default function Admin() {
	const dbClient = new DynamoDBClient({});
	const docClient = DynamoDBDocumentClient.from(dbClient);
	
	return (
		<div>
			<h1>Admin Page</h1>
		</div>
	);
}
