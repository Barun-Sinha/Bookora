import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bio: String,
  birthDate: Date,
  nationality: String
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
