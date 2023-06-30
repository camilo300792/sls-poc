const client = require('../common/dynamodbClient');
const { randomUUID } = require('crypto');

const postUsers = async (event, context) => {
    const userId = randomUUID();
    let userBody = JSON.parse(event.body);
    userBody.pk = userId
    const params = {
        TableName: 'usersTable',
        Item: userBody
    };
    return client.dynamodb.put(params).promise().then(res => {
        return {
            'statusCode': 201,
            'body': JSON.stringify({ 'user': userBody })
        }
    });
};

module.exports = {
    postUsers
}