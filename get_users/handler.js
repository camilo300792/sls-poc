const client = require('../common/dynamodbClient');

const getUsers = async (event, context) => {
    let userId = event.pathParameters.id;
    let params = {
        ExpressionAttributeValues: { ':pk': userId },
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };
    return client.dynamodb.query(params).promise().then(res => {
        return {
            'statusCode': 200,
            'body': JSON.stringify({ 'user': res })
        }
    });
};

module.exports = {
    getUsers
}