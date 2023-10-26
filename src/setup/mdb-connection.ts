import mongoose from 'mongoose';

export const setupMdb = ({ logger: logger }) => {
  return async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'RenderTestEnv',
      });
      logger.info('Connected to Mongo');
    } catch (error) {
      logger.info('Can"t connect to Mongo');
      process.exit(1);
    }
  };
};
