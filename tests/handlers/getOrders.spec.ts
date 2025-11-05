import { createGetOrdersHandlerFactory } from '../../src/handlers/getOrders';

describe('getOrders handler', () => {
  let mockUsecase: { execute: jest.Mock };
  let handler: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsecase = { execute: jest.fn() };
    handler = createGetOrdersHandlerFactory(mockUsecase as any);
  });

  it('should return orders successfully', async () => {
    const items = [{ id: '1' }, { id: '2' }];
    (mockUsecase.execute as jest.Mock).mockResolvedValue(items);

    const response = await handler(null as any, null as any, null as any) as any;

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(items);
  });

  it('should return 500 when usecase throws error', async () => {
    (mockUsecase.execute as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await handler(null as any, null as any, null as any) as any;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
  });
});
