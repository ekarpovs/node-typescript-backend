import { Router } from 'express';

import { userController } from './controller';

export const userRouter = ({ isAuthenticated, isAuthorized, logger }) => {
  logger.info('Setup User Router');
  const cnt = userController({ logger });
  const router = Router();
  router.get(
    '/',
    isAuthenticated,
    isAuthorized('read', 'users'),
    cnt.getAllUsers,
  );
  router.get(
    '/:userId',
    isAuthenticated,
    isAuthorized('read', 'users'),
    cnt.getUserById,
  );
  return router;
};
