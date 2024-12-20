import { Blog } from './blog.model';
import { IBlog } from './blog.interface';

const createBlogIntoDB = async (author: string, payload: IBlog) => {
  const result = (await Blog.create({ ...payload, author })).populate('author');
  return result;
};

export const BlogServices = { createBlogIntoDB };
