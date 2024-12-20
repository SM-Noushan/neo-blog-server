import status from 'http-status';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';
import AppError from '../../errors/AppError';
import { IBlog } from '../blog/blog.interface';
import { IUser } from '../user/user.interface';
import validateDoc from '../../utils/validateDoc';

const blockUserIntoDB = async (id: string) => {
  const user = (await validateDoc({
    model: User,
    query: { _id: id },
    errMsg: '!User not found',
  })) as IUser & Document;
  if (user.isBlocked)
    throw new AppError(status.CONFLICT, '!Failed !!User already blocked');
  user.isBlocked = true;
  await user.save();

  return null;
};

const deleteBlogFromDB = async (id: string) => {
  const blog = (await validateDoc({
    model: Blog,
    query: { _id: id },
    errMsg: '!Blog not found',
  })) as IBlog & Document;
  blog.isPublished = false;
  await blog.save();

  return null;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
