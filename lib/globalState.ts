import {
  Action,
  action,
  createStore,
  createTypedHooks,
} from "easy-peasy";
import { WithId } from "mongodb";
import { TaskDoc } from "./types/task";
import { UserWithoutTaskArray } from "./types/user";

interface Store {
  user: WithId<UserWithoutTaskArray> | undefined;
  setUser: Action<Store, WithId<UserWithoutTaskArray> | undefined>;

  taskArray: TaskDoc[] | WithId<TaskDoc>[];
  setTaskArray: Action<Store, TaskDoc[] | WithId<TaskDoc[]>>;

  updateTask: Action<Store, { task: WithId<TaskDoc> | TaskDoc; taskIndex: number; }>;
  deleteTask: Action<Store, number>;

  moreContextMenuOptions: { name: string, function: () => void; }[];
  setMoreContextMenuOptions: Action<Store, { name: string, function: () => void; }[]>;
}

export const globalState = createStore<Store>({
  user: undefined,
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  taskArray: [],
  setTaskArray: action((state, payload) => {
    state.taskArray = payload;
  }),
  updateTask: action((state, payload) => {
    const newTaskArray = [...state.taskArray];
    newTaskArray[payload.taskIndex] = payload.task;
    state.taskArray = newTaskArray;
  }),
  deleteTask: action((state, payload) => {
    const newTaskArray = [...state.taskArray];
    newTaskArray.splice(payload, 1);
    state.taskArray = newTaskArray;
  }),

  moreContextMenuOptions: [],
  setMoreContextMenuOptions: action((state, payload) => {
    state.moreContextMenuOptions = payload;
  })
});

const typedHooks = createTypedHooks<Store>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;