import { IOrderRepository } from '../repositories/IOrderRepository'

export class GetOrderById {
  constructor(private repo: IOrderRepository) {}
  async execute(id: string) {
    return this.repo.findById(id)
  }
}
