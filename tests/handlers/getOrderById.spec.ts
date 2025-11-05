import { createGetOrderByIdHandlerFactory } from '../../src/handlers/getOrderById';

describe('getOrderById handler', () => {
  let mockUsecase: { execute: jest.Mock };
  let handler: any;
  let mockEvent: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsecase = { execute: jest.fn() };
    handler = createGetOrderByIdHandlerFactory(mockUsecase as any);
    mockEvent = { pathParameters: { id: '123' } } as any;
  });

  it('should return item when found', async () => {
    const item = { id: '123', customerName: 'John' };
    (mockUsecase.execute as jest.Mock).mockResolvedValue(item);

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(item);
  });

  it('should return 404 when item not found', async () => {
    (mockUsecase.execute as jest.Mock).mockResolvedValue(null);

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body)).toEqual({ message: 'Not found' });
  });

  it('should return 500 when usecase throws error', async () => {
    (mockUsecase.execute as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
  });
});
