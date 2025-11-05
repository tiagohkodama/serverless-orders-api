import { Order } from '../../src/entities/Order'

describe('Order entity', () => {
  it('toJSON and updateStatus should work', () => {
    const props = { id: '1', customerName: 'A', amount: 10, status: 'PENDING' as any, createdAt: 't' }
    const order = new Order(props)
    expect(order.toJSON()).toEqual(props)

    order.updateStatus('CONFIRMED' as any)
    expect(order.toJSON().status).toBe('CONFIRMED')
  })
})
