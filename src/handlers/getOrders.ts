import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { GetOrders } from '../usecases/GetOrders'

const repo = new DynamoOrderRepository()
const usecase = new GetOrders(repo)

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const items = await usecase.execute()
    return { statusCode: 200, body: JSON.stringify(items) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
  }
}
