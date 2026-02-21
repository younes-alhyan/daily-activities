import { connectDB } from "@/lib/db/connect";
import { verifyToken } from "@/lib/utils/jwt";
import { toObjectId } from "@/lib/utils/toObjectId";
import { httpErrors } from "@/lib/http/httpErrors";
import { UserModel } from "@/server/models/user.model";

export async function authMiddleware(req: Request) {
  await connectDB();

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer "))
    throw httpErrors.UNAUTHORIZED_ERROR("Invalid Authorization header");

  const token = authHeader.replace("Bearer ", "");
  const payload = verifyToken(token);

  const userExists = await UserModel.exists({
    _id: toObjectId(payload.userId),
  });
  if (!userExists) throw httpErrors.UNAUTHORIZED_ERROR("User not found");

  return payload.userId;
}
