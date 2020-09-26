import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'You can only change this if you are authenticated!',
        401,
      );
    }

    if (user.avatar) {
      // The line below will join the tmp path with the image name
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
