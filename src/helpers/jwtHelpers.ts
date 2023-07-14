import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_SECRET } from '../config/siteEnv';

type IPayload = {
  _id: ObjectId;
  username: string;
};

const createToken = async (payload: IPayload, options?: object) => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  if (!payload) throw new Error('Payload is not defined');
  if (!options) {
    options = {
      expiresIn: '1d'
    };
  }

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

const verifyToken = async (token: string): Promise<JwtPayload> => {
  if (!JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  if (!token) throw new Error('Token is not defined');

  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken
};
