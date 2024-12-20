import status from 'http-status';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';

export const updateFields = <T extends object>(
  target: T,
  source: Partial<T>,
): void =>
  (Object.keys(source) as (keyof T)[]).forEach((key) => {
    if (key in target && source[key] !== undefined) target[key] = source[key];
  });

export const validateBlog = async (id: string, user: string) => {
  const blog = await Blog.findById(id).populate('author');

  if (!blog) throw new AppError(status.NOT_FOUND, 'Blog not found');

  if (!blog.author?.equals(user))
    throw new AppError(
      status.UNAUTHORIZED,
      'Access denied: You are not authorized to perform this action.',
    );

  return blog;
};
