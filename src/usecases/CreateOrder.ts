import { IOrderRepository } from '../repositories/IOrderRepository'
import { v4 as uuidv4 } from 'uuid'
import { OrderProps } from '../entities/Order'

export class CreateOrder {
  constructor(private repo: IOrderRepository) {}

  async execute(data: { customerName: string; amount: number }): Promise<OrderProps> {
    const now = new Date().toISOString()
    const order: OrderProps = {
      id: uuidv4(),
      customerName: data.customerName,
      amount: data.amount,
      status: 'PENDING',
      createdAt: now
    }
    return this.repo.create(order)
  }
}
