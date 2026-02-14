import { Types } from "mongoose";

export interface UserInterface {
  username: string;
  password: string;
}
export interface UserDoc extends UserInterface {
  _id: Types.ObjectId;
}
export interface User {
  id: string;
  username: string;
}
export interface UserLogin extends User {
  token: string;
}
