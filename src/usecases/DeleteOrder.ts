import { IOrderRepository } from '../repositories/IOrderRepository'

export class DeleteOrder {
  constructor(private repo: IOrderRepository) {}
  async execute(id: string) {
    return this.repo.delete(id)
  }
}
