/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { UserRole } from './user.constant';
import { TLoginUser } from '../auth/auth.interface';

export type TUserRole = keyof typeof UserRole;

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
  isBlocked?: boolean;
}

export interface IValidateUserOptions {
  payload: TLoginUser;
  checkIsBlocked?: boolean;
  checkIsPasswordMatched?: boolean;
}

// custom methods here
export interface IUserModel extends Model<IUser> {
  isUserExistsByEmail(
    email: string,
    throwErrorIfUserExist?: boolean,
  ): Promise<Document & IUser>;
  isUserBlocked: (user: IUser) => Promise<void>;
  isPasswordMatched: (user: IUser, password: string) => Promise<void>;
  validateUser: ({
    payload,
    checkIsBlocked,
    checkIsPasswordMatched,
  }: IValidateUserOptions) => Promise<Document & IUser>;
}
