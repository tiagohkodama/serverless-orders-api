"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env.ORDERS_TABLE = 'OrdersTable';
jest.mock('../../src/lib/dynamoClient', () => ({
    ddbDocClient: {
        put: jest.fn(),
        scan: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}));
const DynamoOrderRepository_1 = require("../../src/adapters/DynamoOrderRepository");
const { ddbDocClient } = require('../../src/lib/dynamoClient');
describe('DynamoOrderRepository', () => {
    const TABLE = process.env.ORDERS_TABLE || 'OrdersTable';
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('create should call put and return the order', async () => {
        const repo = new DynamoOrderRepository_1.DynamoOrderRepository();
        const order = { id: '1', customerName: 'A', amount: 10, status: 'PENDING', createdAt: 't' };
        ddbDocClient.put.mockResolvedValue({});
        const res = await repo.create(order);
        expect(ddbDocClient.put).toHaveBeenCalledWith({ TableName: TABLE, Item: order });
        expect(res).toBe(order);
    });
    it('findAll should call scan and return items', async () => {
        const repo = new DynamoOrderRepository_1.DynamoOrderRepository();
        ddbDocClient.scan.mockResolvedValue({ Items: [{ id: '1' }] });
        const res = await repo.findAll();
        expect(ddbDocClient.scan).toHaveBeenCalledWith({ TableName: TABLE });
        expect(res).toEqual([{ id: '1' }]);
    });
    it('findById should call get and return item or null', async () => {
        const repo = new DynamoOrderRepository_1.DynamoOrderRepository();
        ddbDocClient.get.mockResolvedValue({ Item: { id: '1' } });
        const res = await repo.findById('1');
        expect(ddbDocClient.get).toHaveBeenCalledWith({ TableName: TABLE, Key: { id: '1' } });
        expect(res).toEqual({ id: '1' });
        ddbDocClient.get.mockResolvedValue({});
        const res2 = await repo.findById('2');
        expect(res2).toBeNull();
    });
    it('update should call update and return Attributes', async () => {
        const repo = new DynamoOrderRepository_1.DynamoOrderRepository();
        ddbDocClient.update.mockResolvedValue({ Attributes: { id: '1', customerName: 'New' } });
        const res = await repo.update('1', { customerName: 'New' });
        expect(ddbDocClient.update).toHaveBeenCalled();
        expect(res).toEqual({ id: '1', customerName: 'New' });
    });
    it('delete should call delete', async () => {
        const repo = new DynamoOrderRepository_1.DynamoOrderRepository();
        ddbDocClient.delete.mockResolvedValue({});
        await repo.delete('1');
        expect(ddbDocClient.delete).toHaveBeenCalledWith({ TableName: TABLE, Key: { id: '1' } });
    });
});
