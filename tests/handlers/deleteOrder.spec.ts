import { createDeleteOrderHandlerFactory } from '../../src/handlers/deleteOrder';

describe('deleteOrder handler', () => {
  let mockUsecase: { execute: jest.Mock };
  let handler: any;
  let mockEvent: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsecase = { execute: jest.fn() };
    handler = createDeleteOrderHandlerFactory(mockUsecase as any);
    mockEvent = { pathParameters: { id: '123' } } as any;
  });

  it('should delete order successfully', async () => {
    (mockUsecase.execute as jest.Mock).mockResolvedValue(undefined);

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(204);
    expect(response.body).toBe('');
    expect(mockUsecase.execute).toHaveBeenCalledWith('123');
  });

  it('should return 500 when usecase throws error', async () => {
    (mockUsecase.execute as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await handler(mockEvent, null as any, null as any) as any;

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
  });
});
