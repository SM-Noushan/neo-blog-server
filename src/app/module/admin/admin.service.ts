import status from 'http-status';
import { Document } from 'mongoose';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
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

export const AdminServices = {
  blockUserIntoDB,
};
