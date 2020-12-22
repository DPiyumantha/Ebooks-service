import AWS from 'aws-sdk';
import createError from 'http-errors';
import validator from '@middy/validator';
import commonMiddleware from '../lib/commonMiddleware';

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getEbooks(event, context) {
  let ebooks;

  const params = {
    TableName: process.env.EBOOKS_TABLE_NAME,
    KeyConditionExpression: 'id = :id'

    
  };

  try {
    const result = await dynamodb.scan(params).promise();

    ebooks = result.Items;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(ebooks),
  };
}

export const handler = commonMiddleware(getEbooks)
//   .use(validator({ inputSchema: getAuctionsSchema, useDefaults: true }));