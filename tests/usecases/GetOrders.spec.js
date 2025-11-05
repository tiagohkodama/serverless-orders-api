"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetOrders_1 = require("../../src/usecases/GetOrders");
describe('GetOrders usecase', () => {
    it('should return list from repo.findAll', async () => {
        const items = [{ id: '1' }];
        const mockRepo = { findAll: jest.fn().mockResolvedValue(items) };
        const uc = new GetOrders_1.GetOrders(mockRepo);
        const result = await uc.execute();
        expect(result).toBe(items);
        expect(mockRepo.findAll).toHaveBeenCalled();
    });
});
