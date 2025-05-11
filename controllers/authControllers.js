import path from 'node:path';
import fs from 'node:fs/promises';
import * as authService from '../services/authService.js';
import HttpError from '../helpers/HttpError.js';

export const register = async (req, res) => {
  const { email, subscription } = await authService.addUser(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

export const login = async (req, res) => {
  const { token, user } = await authService.login(req.body);

  res.json({ token, user });
};

export const logout = async (req, res) => {
  await authService.logout(req.user.id);

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
  await authService.updateUser(id, { avatarURL: newAvatarURL });
  res.status(200).json({ avatarURL: newAvatarURL });
};

export const verify = async (req, res) => {
  const { verificationToken } = req.params;
  await authService.verifyUser(verificationToken);

  res.json({
    message: 'Verification successful',
  });
};

export const sendVerify = async (req, res) => {
  const { email } = req.body;
  await authService.sendVerify(email);
  res.json({
    message: 'Verification email sent',
  });
};
