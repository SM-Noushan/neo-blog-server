import { z } from 'zod';
import { trimmedString } from '../../utils/validation';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: trimmedString,
    content: trimmedString,
  }),
});

const updateBlogValidationSchema = z.object({
  body: createBlogValidationSchema.shape.body.deepPartial(),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
