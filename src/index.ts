import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response, Router } from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());

// Routers Setup
const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: `Node-Starter connected to: Db - CyclicTestEnv` });
});

app.use(router);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'TestOnCyclic' });
    console.log('Connected to Mongo');
  } catch (error) {
    console.log('Can"t connect to Mongo');
    process.exit(1);
  }
};

connect().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
