import { Types } from "mongoose";

export interface UserInput {
  username: string;
  password: string;
}
export interface UserDoc extends UserInput {
  _id: Types.ObjectId;
}
export interface UserDTO {
  id: string;
  username: string;
}
