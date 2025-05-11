import path from 'node:path';
import fs from 'node:fs/promises';
import * as authServices from '../services/authService.js';
import HttpError from '../helpers/HttpError.js';

export const register = async (req, res) => {
  const { email, subscription } = await authServices.addUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

export const login = async (req, res) => {
  const { token, user } = await authServices.login(req.body);

  res.json({ token, user });
};

export const logout = async (req, res) => {
  await authServices.logout(req.user.id);

  res.status(204).send();
};

export const current = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const updateAvatar = async (req, res) => {
  const { id, avatarURL } = req.user;

  if (!req.file) {
    throw HttpError(400, 'file is required');
  }

  const tempPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newAvatar = `${id}${ext}`;
  const desctination = path.join(process.cwd(), 'public', 'avatars');
  const newPath = path.join(desctination, newAvatar);

  if (avatarURL) {
    const oldAvatar = path.basename(avatarURL);
    if (oldAvatar !== newAvatar) {
      const oldAvatarPath = path.join(desctination, oldAvatar);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.log(`[Error] deleting avatar: ${error}`);
      }
    }
  }

  await fs.rename(tempPath, newPath);
  const newAvatarURL = `/avatars/${newAvatar}`;
  await authServices.updateUser(id, { avatarURL: newAvatarURL });
  res.status(200).json({ avatarURL: newAvatarURL });
};
