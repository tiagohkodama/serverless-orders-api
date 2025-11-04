import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  endpoint: process.env.LOCALSTACK_ENDPOINT || undefined,
  region: process.env.AWS_REGION || 'us-east-1'
})

export const ddbDocClient = DynamoDBDocumentClient.from(client)
