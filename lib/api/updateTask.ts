import apiFunctionHelper from '../apiFunctionHelper';
import { Patch, Body } from '../../pages/api/user/[userId]/[goalId]';

export default async function updateTask(userId: string, goalId: string, taskId: string, modifiedTask: { title?: string, statusColor?: string; }) {

  return await apiFunctionHelper<Patch, Body>(
    {
      method: "PATCH",
      url: `api/user/${userId}/${goalId}`,
      data: { taskId, modifiedTask },
    }
  );
}