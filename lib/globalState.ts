import {
  Action,
  action,
  createStore,
  createTypedHooks,
} from "easy-peasy";
import { WithId } from "mongodb";
import { TaskDoc } from "./task/types";
import { UserWithoutTaskArray } from "./user/types";

interface Store {
  user: WithId<UserWithoutTaskArray> | undefined;
  setUser: Action<Store, WithId<UserWithoutTaskArray> | undefined>;

  createTaskViewVisible: boolean;
  setCreateTaskViewVisible: Action<Store, boolean>;

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

  createTaskViewVisible: false,
  setCreateTaskViewVisible: action((s, p) => {
    s.createTaskViewVisible = p;
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