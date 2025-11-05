"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOrderById_1 = require("../../src/handlers/getOrderById");
describe('getOrderById handler', () => {
    let mockUsecase;
    let handler;
    let mockEvent;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = (0, getOrderById_1.createGetOrderByIdHandlerFactory)(mockUsecase);
        mockEvent = { pathParameters: { id: '123' } };
    });
    it('should return item when found', async () => {
        const item = { id: '123', customerName: 'John' };
        mockUsecase.execute.mockResolvedValue(item);
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(item);
    });
    it('should return 404 when item not found', async () => {
        mockUsecase.execute.mockResolvedValue(null);
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body)).toEqual({ message: 'Not found' });
    });
    it('should return 500 when usecase throws error', async () => {
        mockUsecase.execute.mockRejectedValue(new Error('Test error'));
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });
});
