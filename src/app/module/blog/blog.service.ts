import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

export const BlogServices = { createBlogIntoDB };
