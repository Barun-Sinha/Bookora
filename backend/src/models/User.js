import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
}, { _id: false });

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  fullName: String,
  address: addressSchema,
  phone: String,
  role: {
    type: String,
    enum: ['admin', 'author', 'customer'],
    default: 'customer'
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User',userSchema);
export default User;
