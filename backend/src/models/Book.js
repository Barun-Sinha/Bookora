import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const bookSchema = new Schema({
  title: { type: String, required: true },
  authorIds: [{ type: Schema.Types.ObjectId, ref: 'Author', required: true }],
  genre: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  publishedDate: Date,
  description: String,
  ISBN: { type: String, unique: true },
  ratings: [ratingSchema],
  coverImageUrl: { type: String },
  previewPagesUrls: [{ type: String }]
});

export default mongoose.model('Book', bookSchema);
