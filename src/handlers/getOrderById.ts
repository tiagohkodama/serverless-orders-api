import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { GetOrderById } from '../usecases/GetOrderById'

const repo = new DynamoOrderRepository()
const usecase = new GetOrderById(repo)

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id!
    const item = await usecase.execute(id)
    if (!item) return { statusCode: 404, body: JSON.stringify({ message: 'Not found' }) }
    return { statusCode: 200, body: JSON.stringify(item) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
  }
}
