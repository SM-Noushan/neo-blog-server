import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const registerUser = async (payload: TLoginUser) => {
  // validate user => check if user already exists
  await User.isUserExistsByEmail(payload?.email, false);
  const result = await User.create(payload);
  return result;
};

export const AuthServices = { registerUser };
