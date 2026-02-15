import { Types } from "mongoose";
import { httpErrors } from "@/lib/http/httpErrors";

export const toObjectId = (id: string, label = "id") => {
  if (!Types.ObjectId.isValid(id)) throw httpErrors.BAD_REQUEST_ERROR(`Invalid ${label}`);
  return new Types.ObjectId(id);
};
