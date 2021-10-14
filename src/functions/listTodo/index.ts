import { APIGatewayEvent } from 'aws-lambda';

import { document } from '../../utils/dynamodbClient';

export const handle = async (event: APIGatewayEvent) => {
  const { user_id } = event.pathParameters;

  const response = await document
    .query({
      TableName: 'todos',
      KeyConditionExpression: 'user_id = :user_id',
      ExpressionAttributeValues: {
        ':user_id': user_id,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
