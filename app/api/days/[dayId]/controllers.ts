import { toObjectId } from "@/lib/utils/toObjectId";
import { dayServices } from "@/app/api/days/[dayId]/services";

const deleteDay = (userId: string, dayId: string): Promise<void> =>
  dayServices.delete(toObjectId(userId, "userId"), toObjectId(dayId, "dayId"));

export const dayControllers = {
  delete: deleteDay,
};
