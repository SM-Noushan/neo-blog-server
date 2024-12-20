import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.constant';
import { BlogController } from './blog.controller';
import { BlogValidation } from './blog.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.get('/', BlogController.getAllBlogs);

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

router.delete('/:id', auth(UserRole.user), BlogController.deleteBlog);

export const BlogRoutes = router;
