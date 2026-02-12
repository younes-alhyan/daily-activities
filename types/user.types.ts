import { Types } from "mongoose";

interface UserInterface {
  username: string;
  password: string;
}
export interface User extends UserInterface {
  id: string;
}
export interface UserDoc extends UserInterface {
  _id: Types.ObjectId;
}
