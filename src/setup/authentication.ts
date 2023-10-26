import {
  AuthConfig,
  // BaseUser,
  CookieConfig,
  initAuth,
  SessionConfig,
} from '@ekarpovs/auth-session';
import { User } from '../users';

export const setupAuthentication = ({ app, logger, emailClient }) => {
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
    // User: BaseUser,
    User: User,
    sessionConfig: sessionConfig,
  };

  authConfig.logger = logger;
  authConfig.emailer = emailClient;

  return initAuth(authConfig);
};
