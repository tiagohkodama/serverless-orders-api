import { GetOrders } from '../../src/usecases/GetOrders'

describe('GetOrders usecase', () => {
  it('should return list from repo.findAll', async () => {
    const items = [{ id: '1' }]
    const mockRepo = { findAll: jest.fn().mockResolvedValue(items) } as any
    const uc = new GetOrders(mockRepo)

    const result = await uc.execute()

    expect(result).toBe(items)
    expect(mockRepo.findAll).toHaveBeenCalled()
  })
})
