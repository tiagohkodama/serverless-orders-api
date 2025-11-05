"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOrders_1 = require("../../src/handlers/getOrders");
describe('getOrders handler', () => {
    let mockUsecase;
    let handler;
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsecase = { execute: jest.fn() };
        handler = (0, getOrders_1.createGetOrdersHandlerFactory)(mockUsecase);
    });
    it('should return orders successfully', async () => {
        const items = [{ id: '1' }, { id: '2' }];
        mockUsecase.execute.mockResolvedValue(items);
        const response = await handler(null, null, null);
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual(items);
    });
    it('should return 500 when usecase throws error', async () => {
        mockUsecase.execute.mockRejectedValue(new Error('Test error'));
        const response = await handler(null, null, null);
        expect(response.statusCode).toBe(500);
        expect(JSON.parse(response.body)).toEqual({ message: 'Internal error' });
    });
});
