import { Request, Response } from 'express';
import { Types } from 'mongoose';

export type MongoID = string | Types.ObjectId;

export interface ExtendsType {
  [key: string]: any;
}

export interface UserInfo extends ExtendsType {
  realm_access: { roles: string[] };
  email_verified: boolean;
  name: string;
  given_name: string;
  email: string;
  family_name: string;
  scope: string;
}

export type ExpressContext = {
  req: Request & { user?: UserInfo };
  res: Response;
};
