"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateOrder_1 = require("../../src/usecases/UpdateOrder");
describe('UpdateOrder usecase', () => {
    it('should call repo.update with id and partial', async () => {
        const updated = { id: '123', customerName: 'New' };
        const mockRepo = { update: jest.fn().mockResolvedValue(updated) };
        const uc = new UpdateOrder_1.UpdateOrder(mockRepo);
        const result = await uc.execute('123', { customerName: 'New' });
        expect(result).toBe(updated);
        expect(mockRepo.update).toHaveBeenCalledWith('123', { customerName: 'New' });
    });
});
