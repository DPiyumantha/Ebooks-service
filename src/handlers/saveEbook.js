import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import commonMiddleware from '../lib/commonMiddleware';
import createError from "http-errors";
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function saveEbook(event, context) {
  const { title, author, url, id } = event.body;
  
  const { email } = event.requestContext.authorizer;
//   const {file} = event.body;
  const now = new Date();

  const ebook = {
    id,
    userId:email,
    title,
    author,
    createdAt: now.toISOString(),
    url
  };

  try {
    await dynamodb.put({
      TableName: process.env.LIBRARY_TABLE_NAME,
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

export const handler = commonMiddleware(saveEbook)
//   .use(validator({ inputSchema: createAuctionSchema }));