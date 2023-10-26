import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Router } from 'express';

import {
  setupMdb,
  setupCors,
  setupLogger,
  setupAuthentication,
  setupAuthorization,
  setupEmailer,
} from './setup';
import { docsRouter } from './docs';
import { appRouter } from './app-domain';

dotenv.config();

const app: Express = express();

// for usage with revers-proxy like NGINX
// app.set("trust proxy", 1);
setupCors({ app });

app.use(bodyParser.json());

const logger = setupLogger({ app });

const emailClient = setupEmailer();

const { authRouter, isAuthenticated } = setupAuthentication({
  app,
  logger,
  emailClient,
});
const isAuthorized = setupAuthorization();

// Routers Setup
const router = Router();
router.use('/', appRouter({ isAuthenticated, isAuthorized }));
router.use('/', docsRouter());
router.use('/auth', authRouter);
app.use(router);

// Run server
const connect = setupMdb({ logger });
connect().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
