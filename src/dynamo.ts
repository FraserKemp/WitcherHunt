import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

// Load environment variables based on NODE_ENV (either dev or prod)
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

// Initialize DynamoDB client with region and credentials from the environment
const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION, // The AWS region from .env
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export { dynamoDBClient };
