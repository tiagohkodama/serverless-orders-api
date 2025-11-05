"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteOrder_1 = require("../../src/usecases/DeleteOrder");
describe('DeleteOrder usecase', () => {
    it('should call repo.delete with id', async () => {
        const mockRepo = { delete: jest.fn().mockResolvedValue(undefined) };
        const uc = new DeleteOrder_1.DeleteOrder(mockRepo);
        await uc.execute('abc');
        expect(mockRepo.delete).toHaveBeenCalledWith('abc');
    });
});
