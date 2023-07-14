import bcrypt from 'bcryptjs';

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const isPasswordMatch = await bcrypt.compare(password, hashPassword);
  console.log(isPasswordMatch, 'isPasswordMatch');
  if (!isPasswordMatch) {
    return false;
  }
  return true;
};
