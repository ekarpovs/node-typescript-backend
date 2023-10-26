import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

export const docsRouter = () => {
  const router = Router();
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
  return router;
};
