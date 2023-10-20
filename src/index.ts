import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

import { initLogger, level, LoggerOptions } from '@ekarpovs/simple-logger';
import { LoggerFormatter, initHttpLogger } from '@ekarpovs/http-logger';
import {
  AuthConfig,
  BaseUser,
  CookieConfig,
  initAuth,
  SessionConfig,
} from '@ekarpovs/auth-session';

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());

// const logRotated: loggerOptionsRotated = {
//   fullFilename: process.env.SIMPLE_LOGGER_FILE_LOCATION,
//   datePattern: process.env.SIMPLE_LOGGER_FILE_DATE_PATTERN,
//   fileMaxSize: process.env.SIMPLE_LOGGER_FILE_MAX_SIZE,
//   maxFiles: process.env.SIMPLE_LOGGER_MAX_FILES,
//   zippedArchive: process.env.SIMPLE_LOGGER_ZIPPED_ARCHIVE,
// };

const loggerConfig: LoggerOptions = {
  loggerService: 'Node-Backend-Logger',
  loggerLevel: level.http,
  // loggerOptionsRotated: logRotated,
};

const logger = initLogger(loggerConfig);

const cfg: LoggerFormatter = {
  token:
    ':remote-addr :method :url :status :res[content-length] - :response-time ms',
};

const httpLogger = initHttpLogger(logger, cfg);
app.use(httpLogger);

// Authentication
const cookieConfig: CookieConfig = {
  secure: process.env.COOKIE_SECURE,
  sameSite: process.env.COOKIE_SAME_SITE,
  httpOnly: process.env.COOKIE_HTTP_ONLY,
  maxAge: process.env.COOKIE_MAX_AGE,
};

const sessionConfig: SessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED,
  cookie: cookieConfig,
  resave: process.env.SESSION_RESAVE,
};

const authConfig: AuthConfig = {
  app: app,
  storage: undefined,
  User: BaseUser,
  sessionConfig: sessionConfig,
};

authConfig.logger = logger;

const { authRouter, isAuthenticated } = initAuth(authConfig);

// Routers Setup
const router = Router();
router.use('/auth', authRouter);

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: `Node-Backend connected to: Db - RenderTestEnv` });
});

router.get('/test-auth', isAuthenticated, (_req, res) => {
  res.json({ message: 'You are logged in' });
});

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'RenderTestEnv' });
    console.log('Connected to Mongo');
    logger.info('Connected to Mongo');
  } catch (error) {
    console.log('Can"t connect to Mongo');
    logger.info('Can"t connect to Mongo');
    process.exit(1);
  }
};

connect().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
