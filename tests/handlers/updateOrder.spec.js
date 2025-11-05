"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateOrder_1 = require("../../src/handlers/updateOrder");
describe('updateOrder handler', () => {
    let mockUsecase;
    let handler;
    let mockEvent;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = (0, updateOrder_1.createUpdateOrderHandlerFactory)(mockUsecase);
        mockEvent = { pathParameters: { id: '123' }, body: JSON.stringify({ customerName: 'Jane' }) };
    });
    it('should update order successfully', async () => {
        const updated = { id: '123', customerName: 'Jane' };
        mockUsecase.execute.mockResolvedValue(updated);
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(updated);
        expect(mockUsecase.execute).toHaveBeenCalledWith('123', { customerName: 'Jane' });
    });
    it('should return 500 when usecase throws error', async () => {
        mockUsecase.execute.mockRejectedValue(new Error('Test error'));
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });
});
