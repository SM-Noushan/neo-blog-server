import jwt from 'jsonwebtoken';
import { IUser } from '../user/user.interface';

const createToken = (
  jwtPayload: Pick<IUser, 'email' | 'role'>,
  secret: string,
  expiresIn: string,
): string =>
  jwt.sign(
    {
      userId: jwtPayload.email,
      role: jwtPayload.role,
    },
    secret,
    {
      expiresIn,
    },
  );

export default createToken;
