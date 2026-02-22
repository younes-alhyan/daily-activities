import { Jwt } from "@/lib/utils/jwt";
import { connectDB } from "@/lib/db/connect";
import { httpErrors } from "@/lib/http/httpErrors";
import { toObjectId } from "@/lib/utils/toObjectId";
import { UserModel } from "@/server/models/user.model";

export async function authMiddleware(req: Request, isRefresh?: true) {
  await connectDB();

  const { get, verify } = isRefresh ? Jwt.refreshToken : Jwt.accessToken;
  const token = get(req);
  const payload = verify(token);

  const userExists = await UserModel.exists({
    _id: toObjectId(payload.userId),
  });
  if (!userExists) throw httpErrors.UNAUTHORIZED_ERROR("User not found");

  return payload.userId;
}
