import bcrypt from 'bcryptjs';
import { HASH_SALT } from '../config/siteEnv';

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) throw new Error('Password is required');

  const hashPassword: string = await bcrypt.hash(password, Number(HASH_SALT));

  if (!hashPassword) throw new Error('Password not hashed');

  return hashPassword;
};
