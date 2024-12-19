import { z } from 'zod';
import { alphaString, trimmedString } from '../../utils/validation';

const loginValidationSchema = z.object({
  body: z.object({
    email: trimmedString.email(),
    password: trimmedString,
  }),
});

const registrationValidationSchema = z.object({
  body: z.object({
    name: alphaString,
    email: trimmedString.email().toLowerCase(),
    password: trimmedString.min(6, {
      message: 'Password must be at least 6 characters long',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registrationValidationSchema,
};
