import mongoose from 'mongoose';

const orderHistorySchema = new mongoose.Schema({
    email: String,
    orderedProducts: [{ productName: String, quantity: Number}],
    orderedAt: {
        type: Date,
        default: Date.now
    },
    total: Number
});

const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);
export default OrderHistory;