import { Request, Response, Router } from 'express';

export const appRouter = ({ isAuthenticated, isAuthorized }) => {
  const router = Router();
  // Test that the backend is live
  router.get('/', (_req: Request, res: Response) => {
    res.json({ message: `Node-Backend connected to: Db - RenderTestEnv` });
  });

  // Test a route protected by authentication
  router.get('/test-auth', isAuthenticated, (_req, res) => {
    res.json({ message: 'You are logged in' });
  });

  // Test a route protected by authentication and authorization-acl
  router.get(
    '/test-acl',
    isAuthenticated,
    isAuthorized('read', 'test-acl'),
    (_req, res) => {
      res.json({ message: 'You are authorized to access this resource' });
    },
  );
  return router;
};
