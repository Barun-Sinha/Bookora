import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  phone: String
}, { _id: false });

const orderItemSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true, min: 0 }
}, { _id: false });

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  shippingAddress: addressSchema
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
