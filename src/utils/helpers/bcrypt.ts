
import * as bcrypt from 'bcrypt';
export const hashPassword = async (pinCode: string, salt: string) => {
  return bcrypt.hash(pinCode, salt);
};

export const generateSalt = async () => {
  return await bcrypt.genSalt(10);
};
export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
