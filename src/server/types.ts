import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface Credentials {
  username: string;
  password: string;
  _id: string;
}

export interface RegisterData extends Credentials {
  email: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}
