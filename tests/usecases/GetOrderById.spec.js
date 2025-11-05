"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetOrderById_1 = require("../../src/usecases/GetOrderById");
describe('GetOrderById usecase', () => {
    it('should return item when found', async () => {
        const item = { id: '123' };
        const mockRepo = { findById: jest.fn().mockResolvedValue(item) };
        const uc = new GetOrderById_1.GetOrderById(mockRepo);
        const result = await uc.execute('123');
        expect(result).toBe(item);
        expect(mockRepo.findById).toHaveBeenCalledWith('123');
    });
    it('should return null when not found', async () => {
        const mockRepo = { findById: jest.fn().mockResolvedValue(null) };
        const uc = new GetOrderById_1.GetOrderById(mockRepo);
        const result = await uc.execute('not-found');
        expect(result).toBeNull();
        expect(mockRepo.findById).toHaveBeenCalledWith('not-found');
    });
});
