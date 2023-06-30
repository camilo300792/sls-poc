const aws = require('aws-sdk');

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams = {
        region: process.env.DYNAMODB_REGION,
        endpoint: process.env.DYNAMODB_ENDPOINT,
        accessKeyId: process.env.DYNAMODB_ACCESS_KEY_ID,
        secretAccessKey: process.env.DYNAMODB_SECRET_ACCESS_KEY,
    };
};

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

module.exports = { dynamodb };