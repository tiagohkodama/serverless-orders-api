import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { UpdateOrder } from '../usecases/UpdateOrder'

const repo = new DynamoOrderRepository()
const usecase = new UpdateOrder(repo)

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id!
    const body = JSON.parse(event.body || '{}')
    const updated = await usecase.execute(id, body)
    return { statusCode: 200, body: JSON.stringify(updated) }
  } catch (err) {
    console.error(err)
    return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
  }
}
