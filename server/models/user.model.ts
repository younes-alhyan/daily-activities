import bcrypt from "bcryptjs";
import {
  Schema,
  model,
  models,
  type Model,
  type HydratedDocument,
} from "mongoose";
import type { UserDoc } from "@/types/user.types";

type UserMethods = {
  comparePassword(plainPassword: string): Promise<boolean>;
};

type UserHydrated = HydratedDocument<UserDoc, UserMethods>;

const userSchema = new Schema<
  UserDoc,
  Model<UserDoc, {}, UserMethods>,
  {},
  UserMethods
>({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (this: UserHydrated) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (
  this: UserHydrated,
  plainPassword: string,
) {
  return bcrypt.compare(plainPassword, this.password);
};

export const UserModel: Model<UserDoc, {}, UserMethods> =
  (models.User as Model<UserDoc, {}, UserMethods>) ||
  model<UserDoc, Model<UserDoc, {}, UserMethods>>("User", userSchema);
