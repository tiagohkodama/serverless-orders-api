import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createOrderHandlerFactory } from '../../src/handlers/createOrder';

describe('createOrder handler', () => {
    let mockEvent: any;
    let mockUsecase: { execute: jest.Mock };
    let handler: any;
    
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = createOrderHandlerFactory(mockUsecase as any);
        mockEvent = {
            body: JSON.stringify({
                customerName: 'John Doe',
                amount: 100
            })
        } as any;
    });

    it('should create order successfully', async () => {
        const mockResult = { id: '123', customerName: 'John Doe', amount: 100 };
        (mockUsecase.execute as jest.Mock).mockResolvedValue(mockResult);

    const response = await handler(mockEvent, null as any, null as any) as any;

        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body)).toEqual(mockResult);
    });

    it('should return 500 when usecase throws error', async () => {
        (mockUsecase.execute as jest.Mock).mockRejectedValue(new Error('Test error'));

    const response = await handler(mockEvent, null as any, null as any) as any;

        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });

    it('should handle missing request body', async () => {
        mockEvent.body = null;
        (mockUsecase.execute as jest.Mock).mockResolvedValue({ id: '123' });

    const response = await handler(mockEvent, null as any, null as any) as any;

        expect(response.statusCode).toBe(201);
        expect(mockUsecase.execute).toHaveBeenCalledWith({
            customerName: undefined,
            amount: undefined
        });
    });
});