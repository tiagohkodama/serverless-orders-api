import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { CreateOrder } from '../usecases/CreateOrder'

// Factory that returns a handler bound to the provided usecase.
// Accepts any object with an `execute` method so tests can inject a mock.
export const createOrderHandlerFactory = (
  usecase: { execute: (input: any) => Promise<any> }
): APIGatewayProxyHandler => {
  return async (event) => {
    try {
      const body = JSON.parse(event.body || '{}')
      const result = await usecase.execute({
        customerName: body.customerName,
        amount: body.amount
      })
      return {
        statusCode: 201,
        body: JSON.stringify(result)
      }
    } catch (err) {
      console.error(err)
      return { statusCode: 500, body: JSON.stringify({ message: 'Internal error' }) }
    }
  }
}

// Default production wiring: real repository + real usecase
const repo = new DynamoOrderRepository()
const usecase = new CreateOrder(repo)
export const handler: APIGatewayProxyHandler = createOrderHandlerFactory(usecase)
