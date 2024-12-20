import { z } from 'zod';
import { trimmedString } from '../../utils/validation';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: trimmedString,
    content: trimmedString,
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
