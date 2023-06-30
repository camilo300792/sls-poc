const client = require('../common/dynamodbClient');


const putUsers = async (event, context) => {
    const userId = event.pathParameters.id;
    const userBody = JSON.parse(event.body);
    const params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: 'set #name = :name, #last_name = :last_name, #age = :age',
        ExpressionAttributeNames: { '#name': 'name', '#last_name': 'last_name', '#age': 'age' },
        ExpressionAttributeValues: {
            ':name': userBody.name,
            ':last_name': userBody.last_name,
            ':age': userBody.age,
        },
        ReturnValues: 'ALL_NEW'
    };
    return client.dynamodb.update(params).promise().then(res => {
        return {
            'statusCode': 200,
            'body': JSON.stringify({ 'user': res.Attributes })
        }
    });
};

module.exports = {
    putUsers
}