import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { updateFields, validateBlog } from './blog.utils';

const createBlogIntoDB = async (author: string, payload: TBlog) => {
  const result = (await Blog.create({ ...payload, author })).populate('author');
  return result;
};

const updateBlogIntoDB = async (id: string, user: string, payload: TBlog) => {
  const blog = await validateBlog(id, user);

  updateFields(blog, payload);
  await blog.save();

  return blog;
};

const deleteBlogFromDB = async (id: string, user: string) => {
  const blog = await validateBlog(id, user);

  blog.isPublished = false;
  await blog.save();

  return null;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
