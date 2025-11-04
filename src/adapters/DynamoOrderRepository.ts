import { ddbDocClient } from '../lib/dynamoClient'
import { IOrderRepository } from '../repositories/IOrderRepository'
import { OrderProps } from '../entities/Order'

const TABLE = process.env.ORDERS_TABLE!

export class DynamoOrderRepository implements IOrderRepository {
  async create(order: OrderProps): Promise<OrderProps> {
    await ddbDocClient.put({ TableName: TABLE, Item: order })
    return order
  }

  async findAll(): Promise<OrderProps[]> {
    const resp = await ddbDocClient.scan({ TableName: TABLE })
    return (resp.Items as OrderProps[]) || []
  }

  async findById(id: string): Promise<OrderProps | null> {
    const resp = await ddbDocClient.get({ TableName: TABLE, Key: { id } })
    return (resp.Item as OrderProps) ?? null
  }

  async update(id: string, partial: Partial<OrderProps>): Promise<OrderProps> {
    const updateExprParts: string[] = []
    const exprAttrNames: Record<string, string> = {}
    const exprAttrValues: Record<string, any> = {}

    let idx = 0
    for (const [k, v] of Object.entries(partial)) {
      idx++
      const name = `#k${idx}`
      const val = `:v${idx}`
      updateExprParts.push(`${name} = ${val}`)
      exprAttrNames[name] = k
      exprAttrValues[val] = v
    }

    const UpdateExpression = 'SET ' + updateExprParts.join(', ')

    const resp = await ddbDocClient.update({
      TableName: TABLE,
      Key: { id },
      UpdateExpression,
      ExpressionAttributeNames: exprAttrNames,
      ExpressionAttributeValues: exprAttrValues,
      ReturnValues: 'ALL_NEW'
    })

    return resp.Attributes as OrderProps
  }

  async delete(id: string): Promise<void> {
    await ddbDocClient.delete({ TableName: TABLE, Key: { id } })
  }
}
