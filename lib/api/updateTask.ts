import apiFunctionHelper from '../apiFunctionHelper';
import { Patch } from '../../pages/api/user/[userId]/[goalId]';

export default async function updateTask(userId: string, goalId: string, taskId: number, modifiedTask: { title?: string, statusColor?: string; }) {

  return await apiFunctionHelper<Patch>(
    {
      method: "PATCH",
      url: `api/user/${userId}/${goalId}`,
      data: { taskId, modifiedTask },
    }
  );
}