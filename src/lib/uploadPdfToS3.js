import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export async function uploadPictureToS3(key, body) {
  const result = await s3.upload({
    Bucket: process.env.EBOOKS_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: 'application/pdf'
  }).promise();

  return result.Location;
}