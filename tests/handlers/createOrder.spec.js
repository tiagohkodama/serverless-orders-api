"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createOrder_1 = require("../../src/handlers/createOrder");
describe('createOrder handler', () => {
    let mockEvent;
    let mockUsecase;
    let handler;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = (0, createOrder_1.createOrderHandlerFactory)(mockUsecase);
        mockEvent = {
            body: JSON.stringify({
                customerName: 'John Doe',
                amount: 100
            })
        };
    });
    it('should create order successfully', async () => {
        const mockResult = { id: '123', customerName: 'John Doe', amount: 100 };
        mockUsecase.execute.mockResolvedValue(mockResult);
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.body)).toEqual(mockResult);
    });
    it('should return 500 when usecase throws error', async () => {
        mockUsecase.execute.mockRejectedValue(new Error('Test error'));
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });
    it('should handle missing request body', async () => {
        mockEvent.body = null;
        mockUsecase.execute.mockResolvedValue({ id: '123' });
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(201);
        expect(mockUsecase.execute).toHaveBeenCalledWith({
            customerName: undefined,
            amount: undefined
        });
    });
});
