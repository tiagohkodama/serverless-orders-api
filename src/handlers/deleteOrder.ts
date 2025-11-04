import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { DeleteOrder } from '../usecases/DeleteOrder'

const repo = new DynamoOrderRepository()
const usecase = new DeleteOrder(repo)

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id!
    await usecase.execute(id)
    return { statusCode: 204, body: '' }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
  }
}
