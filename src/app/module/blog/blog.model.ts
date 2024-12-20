import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author ID is required'],
    },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre(['find', 'findOne'], function (next) {
  this.find({ isPublished: { $ne: false } });
  next();
});

export const Blog = model<IBlog>('Blog', blogSchema);
