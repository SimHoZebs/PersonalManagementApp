import apiFunctionHelper from '../apiFunctionHelper';
import { Patch, Body } from '../../pages/api/user/[userId]/[goalId]';
import { GoalBasicProps } from '../schema/GoalSchema';

/**
 * 
 * @param userId; target user id.
 * @param goalId; target goal id. 
 * @param prop; target prop in goal. 
 * @param modifiedGoalProps 
 * @returns 
 */
export default async function updateGoal(
  userId: string,
  goalId: string,
  modifiedGoalProps: GoalBasicProps
) {

  return await apiFunctionHelper<Patch, Body>({
    method: 'PATCH',
    url: `api/user/${userId}/${goalId}`,
    data: { modifiedGoal: modifiedGoalProps },
    params: {}
  });
}