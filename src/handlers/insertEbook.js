import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function insertEbook(event, context) {
  const { title } = event.body;
  const { author } = event.body;
  const { email } = event.requestContext.authorizer;
//   const {file} = event.body;
//   const { email } = event.requestContext.authorizer;
  const now = new Date();

  const ebook = {
    id: uuid(),
    title,
    userId:email,
    author,
    createdAt: now.toISOString(),
    url:"testUrl"
  };

  try {
    await dynamodb.put({
      TableName: process.env.EBOOKS_TABLE_NAME,
      Item: ebook,
    }).promise();
  } catch(error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(ebook),
  };
}

export const handler = commonMiddleware(insertEbook)
//   .use(validator({ inputSchema: createAuctionSchema }));