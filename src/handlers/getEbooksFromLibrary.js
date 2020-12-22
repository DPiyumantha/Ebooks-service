import AWS from "aws-sdk";
import createError from "http-errors";
import validator from "@middy/validator";
import commonMiddleware from "../lib/commonMiddleware";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getEbooksFromLibrary(event, context) {
  let ebooks;
  const { email } = event.requestContext.authorizer;
  const params = {
    TableName: process.env.LIBRARY_TABLE_NAME,
    FilterExpression: "userId=:userId",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":userId": email,
    },
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

export const handler = commonMiddleware(getEbooksFromLibrary);
//   .use(validator({ inputSchema: getAuctionsSchema, useDefaults: true }));
