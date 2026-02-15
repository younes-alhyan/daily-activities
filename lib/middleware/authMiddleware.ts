import { connectDB } from "@/lib/db/connect";
import { verifyToken } from "@/lib/utils/jwt";
import { httpErrors } from "@/lib/http/httpErrors";
import { UserModel } from "@/server/models/user.model";

export async function authMiddleware(authHeader: string) {
  await connectDB();

  if (!authHeader?.startsWith("Bearer "))
    throw httpErrors.UNAUTHORIZED_ERROR("Invalid Authorization header");

  const token = authHeader.replace("Bearer ", "");

  const payload = verifyToken(token);

  const userExists = await UserModel.exists({ _id: payload.userId });

  if (!userExists) throw httpErrors.UNAUTHORIZED_ERROR("User not found");

  return payload.userId;
}
