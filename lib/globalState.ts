import {
  Action,
  action,
  createStore,
  createTypedHooks,
} from "easy-peasy";

import { UserProps } from "../lib/schema/UserSchema";
import { GoalBasicProps } from "../lib/schema/GoalSchema";
import { TaskProps } from "../lib/schema/TaskSchema";

interface Store {
  user: UserProps | undefined;
  setUser: Action<Store, UserProps | undefined>;
  goalProps: GoalBasicProps | undefined;
  setGoalProps: Action<Store, GoalBasicProps | undefined>;
  taskArray: TaskProps[];
  setTaskArray: Action<Store, TaskProps[]>;
  updateTask: Action<Store, { task: TaskProps; taskIndex: number; }>;
  deleteTask: Action<Store, number>;
  contextMenuOptions: { option: string, function: () => void; }[];
  setContextMenuOptions: Action<Store, { option: string, function: () => void; }[]>;
}

export const globalState = createStore<Store>({
  user: undefined,
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  goalProps: undefined,
  setGoalProps: action((state, payload) => {
    state.goalProps = payload;
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

  contextMenuOptions: [],
  setContextMenuOptions: action((state, payload) => {
    state.contextMenuOptions = payload;
  })
});

const typedHooks = createTypedHooks<Store>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;