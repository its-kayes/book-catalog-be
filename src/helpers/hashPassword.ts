import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) throw new Error('Password is required');

  const hashPassword: string = await bcrypt.hash(password, 10);

  if (!hashPassword) throw new Error('Password not hashed');

  return hashPassword;
};
