import { createUpdateOrderHandlerFactory } from '../../src/handlers/updateOrder';

describe('updateOrder handler', () => {
  let mockUsecase: { execute: jest.Mock };
  let handler: any;
  let mockEvent: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsecase = { execute: jest.fn() };
    handler = createUpdateOrderHandlerFactory(mockUsecase as any);
    mockEvent = { pathParameters: { id: '123' }, body: JSON.stringify({ customerName: 'Jane' }) } as any;
  });

  it('should update order successfully', async () => {
    const updated = { id: '123', customerName: 'Jane' };
    (mockUsecase.execute as jest.Mock).mockResolvedValue(updated);

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(updated);
    expect(mockUsecase.execute).toHaveBeenCalledWith('123', { customerName: 'Jane' });
  });

  it('should return 500 when usecase throws error', async () => {
    (mockUsecase.execute as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
  });
});
