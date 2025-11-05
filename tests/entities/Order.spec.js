"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = require("../../src/entities/Order");
describe('Order entity', () => {
    it('toJSON and updateStatus should work', () => {
        const props = { id: '1', customerName: 'A', amount: 10, status: 'PENDING', createdAt: 't' };
        const order = new Order_1.Order(props);
        expect(order.toJSON()).toEqual(props);
        order.updateStatus('CONFIRMED');
        expect(order.toJSON().status).toBe('CONFIRMED');
    });
});
