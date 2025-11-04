import { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoOrderRepository } from '../adapters/DynamoOrderRepository'
import { CreateOrder } from '../usecases/CreateOrder'

const repo = new DynamoOrderRepository()
const usecase = new CreateOrder(repo)

export const handler: APIGatewayProxyHandler = async (event) => {
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
