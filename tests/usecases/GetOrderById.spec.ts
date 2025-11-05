import { GetOrderById } from '../../src/usecases/GetOrderById'

describe('GetOrderById usecase', () => {
  it('should return item when found', async () => {
    const item = { id: '123' }
    const mockRepo = { findById: jest.fn().mockResolvedValue(item) } as any
    const uc = new GetOrderById(mockRepo)

    const result = await uc.execute('123')

    expect(result).toBe(item)
    expect(mockRepo.findById).toHaveBeenCalledWith('123')
  })

  it('should return null when not found', async () => {
    const mockRepo = { findById: jest.fn().mockResolvedValue(null) } as any
    const uc = new GetOrderById(mockRepo)

    const result = await uc.execute('not-found')

    expect(result).toBeNull()
    expect(mockRepo.findById).toHaveBeenCalledWith('not-found')
  })
})
