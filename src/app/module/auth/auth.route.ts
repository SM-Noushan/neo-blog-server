import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/register',
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthController.registerUser,
);

export const AuthRoutes = router;
