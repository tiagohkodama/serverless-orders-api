import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { DeleteOrder } from '../usecases/DeleteOrder'

export const createDeleteOrderHandlerFactory = (
  usecase: { execute: (id: string) => Promise<any> }
): APIGatewayProxyHandler => {
  return async (event) => {
    try {
      const id = event.pathParameters?.id!
      await usecase.execute(id)
      return { statusCode: 204, body: '' }
    } catch (err) {
      console.error(err)
      return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
    }
  }
}

// Default production wiring
const repo = new DynamoOrderRepository()
const usecase = new DeleteOrder(repo)
export const handler: APIGatewayProxyHandler = createDeleteOrderHandlerFactory(usecase)
