import { Router } from 'express';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/',
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
