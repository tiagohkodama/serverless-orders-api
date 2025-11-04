import { IOrderRepository } from '../repositories/IOrderRepository'

export class GetOrders {
  constructor(private repo: IOrderRepository) {}
  async execute() {
    return this.repo.findAll()
  }
}
