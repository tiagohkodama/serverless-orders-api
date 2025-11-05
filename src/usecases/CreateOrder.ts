import { IOrderRepository } from '../repositories/IOrderRepository'
import { v4 as uuidv4 } from 'uuid'
import { OrderProps } from '../entities/Order'

// Make CreateOrder testable by allowing injection of an id generator and a clock function.
export class CreateOrder {
  constructor(
    private repo: IOrderRepository,
    // idGen and nowFn are optional and default to uuidv4 and current ISO time
    private idGen: () => string = uuidv4,
    private nowFn: () => string = () => new Date().toISOString()
  ) {}

  async execute(data: { customerName: string; amount: number }): Promise<OrderProps> {
    const now = this.nowFn()
    const order: OrderProps = {
      id: this.idGen(),
      customerName: data.customerName,
      amount: data.amount,
      status: 'PENDING',
      createdAt: now
    }
    return this.repo.create(order)
  }
}
