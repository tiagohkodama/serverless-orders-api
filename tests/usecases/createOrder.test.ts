import { CreateOrder } from '../../src/usecases/CreateOrder'

const mockRepo = {
  create: jest.fn()
}

describe('CreateOrder usecase', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('creates an order and returns it', async () => {
    const now = new Date().toISOString()
    const created = { id: '1', customerName: 'Bo', amount: 10, status: 'PENDING', createdAt: now }
    mockRepo.create.mockResolvedValueOnce(created)
    const uc = new CreateOrder(mockRepo as any)
    const result = await uc.execute({ customerName: 'Bo', amount: 10 })
    expect(mockRepo.create).toHaveBeenCalled()
    expect(result).toHaveProperty('id')
    expect(result.customerName).toBe('Bo')
  })
})
