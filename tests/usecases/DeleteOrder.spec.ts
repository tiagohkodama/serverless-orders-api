import { DeleteOrder } from '../../src/usecases/DeleteOrder'

describe('DeleteOrder usecase', () => {
  it('should call repo.delete with id', async () => {
    const mockRepo = { delete: jest.fn().mockResolvedValue(undefined) } as any
    const uc = new DeleteOrder(mockRepo)

    await uc.execute('abc')

    expect(mockRepo.delete).toHaveBeenCalledWith('abc')
  })
})
