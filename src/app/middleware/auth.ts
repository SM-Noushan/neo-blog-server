import config from '../config';
import status from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../module/user/user.model';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../module/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    // if token is present
    if (!token) throw new AppError(status.UNAUTHORIZED, '!Unauthorized access');

    const decoded = jwt.verify(
      token,
      config.JwtAccessSecret as string,
    ) as JwtPayload;
    const { email, role } = decoded;
    // validate user => check if user exists, and is not blocked
    const userInfo = await User.validateUser({
      payload: { email: email, password: '' },
      checkIsPasswordMatched: false,
    });
    //   check if user has required role
    if (requiredRoles.length > 0 && !requiredRoles.includes(role))
      throw new AppError(status.FORBIDDEN, '!Forbidden access');
    decoded.userId = userInfo._id;
    req.user = decoded as JwtPayload;
    next();
  });

export default auth;
