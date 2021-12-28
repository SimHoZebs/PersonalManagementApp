import addGoalId from "../api/addGoalId";
import createGoal from "../api/createGoal";
import updateLastViewedGoalId from "../api/updateLastViewedGoalId";
import { GoalProps } from "../schema/GoalSchema";

/**
 * Creates a goal and adds it to a user.
 * Sets that goal as selected goal.
 * @returns userSchema; The user the temp defaults were applied.
 * @returns string; if any error occurs.
 */
export default async function addUserDefaults(userId: string) {
  let createdGoal: GoalProps;
  const createGoalRes = await createGoal(userId, "Welcome!");
  if (createGoalRes instanceof Error) {
    return createGoalRes;
  }
  createdGoal = createGoalRes;

  const addGoalIdRes = await addGoalId(userId, createdGoal._id);
  if (addGoalIdRes instanceof Error) {
    return addGoalIdRes;
  }

  const updateLastViewedGoalIdRes = await updateLastViewedGoalId(
    userId,
    createGoalRes._id
  );
  return updateLastViewedGoalIdRes;
}
