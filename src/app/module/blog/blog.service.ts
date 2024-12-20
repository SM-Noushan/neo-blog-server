import status from 'http-status';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { updateFields } from './blog.utils';
import AppError from '../../errors/AppError';

const createBlogIntoDB = async (author: string, payload: TBlog) => {
  const result = (await Blog.create({ ...payload, author })).populate('author');
  return result;
};

const updateBlogIntoDB = async (id: string, user: string, payload: TBlog) => {
  const blog = await Blog.findById(id).populate('author');

  if (!blog) throw new AppError(status.NOT_FOUND, 'Blog not found');
  if (!blog?.author?.equals(user))
    throw new AppError(
      status.UNAUTHORIZED,
      '!Denied !!You are not authorized to update this blog',
    );
  updateFields(blog, payload);
  await blog.save();

  return blog;
};

export const BlogServices = { createBlogIntoDB, updateBlogIntoDB };
