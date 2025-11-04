export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'

export interface OrderProps {
  id: string
  customerName: string
  amount: number
  status: OrderStatus
  createdAt: string
}

export class Order {
  constructor(private props: OrderProps) {}

  toJSON(): OrderProps {
    return { ...this.props }
  }

  updateStatus(status: OrderStatus) {
    this.props.status = status
  }
}
