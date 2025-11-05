import { CreateOrder } from '../../src/usecases/CreateOrder'

describe('CreateOrder usecase', () => {
  it('should create an order with generated id and timestamp', async () => {
    const mockRepo = { create: jest.fn().mockImplementation((o) => Promise.resolve(o)) } as any
    const idGen = () => 'fixed-id-123'
    const nowFn = () => '2025-11-04T00:00:00.000Z'
    const uc = new CreateOrder(mockRepo, idGen, nowFn)

    const result = await uc.execute({ customerName: 'Alice', amount: 42 })

    expect(result.id).toBe('fixed-id-123')
    expect(result.customerName).toBe('Alice')
    expect(result.amount).toBe(42)
    expect(result.status).toBe('PENDING')
    expect(result.createdAt).toBe('2025-11-04T00:00:00.000Z')
    expect(mockRepo.create).toHaveBeenCalledWith(result)
  })
})
