import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.constant';
import { AdminController } from './admin.controller';

const router = Router();

router.patch(
  '/users/:userId/block',
  auth(UserRole.admin),
  AdminController.blockUser,
);

export const AdminRoutes = router;
