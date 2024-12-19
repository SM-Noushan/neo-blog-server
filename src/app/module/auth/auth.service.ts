import config from '../../config';
import createToken from './auth.utils';
import { User } from '../user/user.model';
import { UserRole } from '../user/user.constant';
import { TLoginUser, TRegisterUser } from './auth.interface';

const registerUser = async (payload: TRegisterUser) => {
  // validate user => check if user already exists
  await User.isUserExistsByEmail(payload?.email, false);
  const result = await User.create(payload);
  const token = createToken(
    { email: payload.email, role: UserRole.user },
    config.JwtAccessSecret as string,
    config.JwtAccessExpiration as string,
  );
  return {
    token,
    user: result,
  };
};

const loginUser = async (payload: TLoginUser) => {
  // validate user => check if user exists, is blocked, and is password correct
  const userInfo = await User.validateUser({ payload });
  //   create token and return to client
  const token = createToken(
    userInfo,
    config.JwtAccessSecret as string,
    config.JwtAccessExpiration as string,
  );
  return token;
};

export const AuthServices = { registerUser, loginUser };
