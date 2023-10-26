import { Request, Response } from 'express';
import { AppError, ResponseCode } from '@ekarpovs/simple-error-handler';

import { User } from './model';

export const userController = ({ logger }) => {
  logger.info('Setup User Controller');
  const getAllUsers = async (_req: Request, res: Response) => {
    const users = await User.find({});
    if (!users) {
      throw new AppError({
        code: ResponseCode.NOT_FOUND,
        description: 'There are no users',
      });
    }
    return res.status(ResponseCode.OK).json(users);
  };
  const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const user = await getUserData(userId);
    if (!user) {
      throw new AppError({
        code: ResponseCode.NOT_FOUND,
        description: "The user doesn't exists",
      });
    }
    return res.status(ResponseCode.OK).json(user);
  };
  const getUserData = async (userId: string) => {
    return await User.findById(userId);
  };

  return {
    getAllUsers,
    getUserById,
  };
};
