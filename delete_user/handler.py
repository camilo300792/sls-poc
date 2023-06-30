import os
from types import SimpleNamespace
from typing import Dict
import boto3


client = boto3.resource('dynamodb')

IS_OFFLINE = os.getenv('IS_OFFLINE', False)

if IS_OFFLINE:
    boto3.Session(
        aws_access_key_id=os.getenv('DYNAMODB_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('DYNAMODB_SECRET_ACCESS_KEY'),
    )
    client = boto3.resource(
        'dynamodb',
        endpoint_url=os.getenv('DYNAMODB_ENDPOINT'),
    )

table = client.Table('usersTable')


def delete_users(
    event: Dict[str, any], _: SimpleNamespace
) -> Dict[str, any]:
    userId = event.get('pathParameters').get('id')
    result = table.delete_item(Key={'pk': userId})
    return {
        'statusCode': result.get('ResponseMetadata').get('HTTPStatusCode')
    }
