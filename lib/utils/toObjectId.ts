import { Types } from "mongoose";
import { Errors } from "@/lib/utils/errors";

export const toObjectId = (id: string, label = "id") => {
  if (!Types.ObjectId.isValid(id))
    throw Errors.BAD_REQUEST_ERROR(`Invalid ${label}`);
  return new Types.ObjectId(id);
};
