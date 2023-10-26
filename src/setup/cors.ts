import { NextFunction, Request, Response } from 'express';
import cors from 'cors';

export const setupCors = ({ app }) => {
  app.use(
    cors({
      credentials: true,
      origin: [process.env.CLIENT_BASE_URL || 'http://localhost:3007'],
    }),
  );

  app.use((_req: Request, res: Response, next: NextFunction) => {
    // res.header('Content-Type', 'application/json;charset=UTF-8');
    // res.header('Content-Type', 'text/html;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
};
