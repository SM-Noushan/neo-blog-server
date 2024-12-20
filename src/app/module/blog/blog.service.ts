import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';
import { updateFields, validateBlog } from './blog.utils';

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find(), query)
    .search(BlogSearchableFields)
    .sort()
    .filter();
  const result = await blogsQuery.modelQuery.populate('author');
  return result;
};

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
  getAllBlogsFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
