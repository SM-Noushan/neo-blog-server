import express from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { BlogRoutes } from '../module/blog/blog.route';
import { AdminRoutes } from '../module/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
