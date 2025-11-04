import { OrderProps } from '../entities/Order'

export interface IOrderRepository {
  create(order: OrderProps): Promise<OrderProps>
  findAll(): Promise<OrderProps[]>
  findById(id: string): Promise<OrderProps | null>
  update(id: string, partial: Partial<OrderProps>): Promise<OrderProps>
  delete(id: string): Promise<void>
}
