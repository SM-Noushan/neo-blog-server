import { z } from 'zod';
import { alphaString, trimmedString } from '../../utils/validation';

const registrationValidationSchema = z.object({
  body: z.object({
    name: alphaString,
    email: trimmedString.email(),
    password: trimmedString.min(6, {
      message: 'Password must be at least 6 characters long',
    }),
  }),
});

export const AuthValidation = {
  registrationValidationSchema,
};
