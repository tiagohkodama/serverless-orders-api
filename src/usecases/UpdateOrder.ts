import { IOrderRepository } from '../repositories/IOrderRepository'
import { OrderProps } from '../entities/Order'

export class UpdateOrder {
  constructor(private repo: IOrderRepository) {}
  async execute(id: string, partial: Partial<OrderProps>) {
    return this.repo.update(id, partial)
  }
}
