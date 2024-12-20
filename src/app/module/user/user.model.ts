import bcrypt from 'bcrypt';
import status from 'http-status';
import config from '../../config';
import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import validateDoc from '../../utils/validateDoc';
import { UserRole, UserRoleEnum } from './user.constant';
import { IUser, IUserModel, IValidateUserOptions } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: {
        values: UserRoleEnum,
        message: '{VALUE} is not a valid role',
      },
      default: UserRole.user,
    },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// hashing password
userSchema.pre('save', async function (next) {
  if (this.password)
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcryptSaltRounds),
    );
  next();
});

userSchema.post('save', async function (doc, next) {
  if (doc.password) doc.password = '🤫';
  next();
});

// custom methods
// check if user exists
userSchema.statics.isUserExistsByEmail = async function (
  email: string,
  throwErrorIfUserExist = true,
) {
  return await validateDoc({
    model: this,
    query: { email: { $regex: email, $options: 'i' } },
    errMsg: throwErrorIfUserExist
      ? '!Unauthorized !!User not found.'
      : '!Denied !!User already exists',
    select: '+password',
    trueValidate: throwErrorIfUserExist,
  });
};

//  check if user id blocked
userSchema.statics.isUserBlocked = function (userInfo: IUser) {
  if (userInfo.isBlocked)
    throw new AppError(status.FORBIDDEN, '!Blocked !!Access denied');
};

//  check if user password is correct
userSchema.statics.isPasswordMatched = async function (
  userInfo: IUser,
  password: string,
) {
  const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);
  if (!isPasswordCorrect)
    throw new AppError(status.UNAUTHORIZED, '!Invalid credentials');
};

// validate user => check if user exists, is blocked, and is password correct
userSchema.statics.validateUser = async function ({
  payload,
  checkIsBlocked = true,
  checkIsPasswordMatched = true,
}: IValidateUserOptions) {
  const userInfo = await this.isUserExistsByEmail(payload.email);
  if (checkIsBlocked) this.isUserBlocked(userInfo);
  if (checkIsPasswordMatched)
    await this.isPasswordMatched(userInfo, payload.password);
  return userInfo;
};

export const User = model<IUser, IUserModel>('User', userSchema);
