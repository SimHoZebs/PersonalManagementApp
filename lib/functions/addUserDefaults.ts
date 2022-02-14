import addGoal from "../api/addGoal";
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

  const addGoalRes = await addGoal(userId, createdGoal._id, createdGoal.title);
  if (addGoalRes instanceof Error) {
    return addGoalRes;
  }

  const updateLastViewedGoalIdRes = await updateLastViewedGoalId(
    userId,
    createGoalRes._id
  );
  return updateLastViewedGoalIdRes;
}
