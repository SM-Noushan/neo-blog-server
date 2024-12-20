import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.constant';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/',
  auth(UserRole.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(UserRole.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

export const BlogRoutes = router;
