import addListId from "../api/addListId";
import createList from "../api/createList";
import updateSelectedListId from "../api/updateSelectedListId";
import { ListSchema } from "../schema/ListSchema";

/**
 * Creates a list and adds it to a user.
 * Sets that list as selected list.
 * @returns userSchema; The user the temp defaults were applied.
 * @returns string; if any error occurs.
 */
export default async function addUserDefaults(userId: string) {
  let createdList: ListSchema;
  const createListRes = await createList(userId, "Welcome!");
  if (createListRes instanceof Error) {
    return createListRes;
  }
  createdList = createListRes;

  const addListIdRes = await addListId(userId, createdList._id);
  if (addListIdRes instanceof Error) {
    return addListIdRes;
  }

  const updateSelectedListIdRes = await updateSelectedListId(
    userId,
    createListRes._id
  );
  return updateSelectedListIdRes;
}
