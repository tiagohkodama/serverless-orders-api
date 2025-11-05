"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteOrder_1 = require("../../src/handlers/deleteOrder");
describe('deleteOrder handler', () => {
    let mockUsecase;
    let handler;
    let mockEvent;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = (0, deleteOrder_1.createDeleteOrderHandlerFactory)(mockUsecase);
        mockEvent = { pathParameters: { id: '123' } };
    });
    it('should delete order successfully', async () => {
        mockUsecase.execute.mockResolvedValue(undefined);
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(204);
        expect(response.body).toBe('');
        expect(mockUsecase.execute).toHaveBeenCalledWith('123');
    });
    it('should return 500 when usecase throws error', async () => {
        mockUsecase.execute.mockRejectedValue(new Error('Test error'));
        const response = await handler(mockEvent, null, null);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });
});
