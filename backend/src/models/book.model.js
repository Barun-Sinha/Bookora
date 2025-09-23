import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // user who gave the rating
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }], // references User model with role=author
  genre: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  publishedDate: Date,
  description: String,
  ISBN: { type: String, unique: true },
  ratings: [ratingSchema],
  coverImageUrl: { type: String },
  previewPagesUrls: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);

