import {
  Action,
  action,
  createStore,
  createTypedHooks,
} from "easy-peasy";
import { WithId } from "mongodb";
import { Status, TaskDoc } from "./task/types";
import { UserWithoutTaskArray } from "./user/types";

interface Store {
  user: WithId<UserWithoutTaskArray> | undefined;
  setUser: Action<Store, WithId<UserWithoutTaskArray> | undefined>;

  createTaskViewSetting: { visible: boolean; status: Status; };
  setCreateTaskViewSetting: Action<Store, { visible: boolean; status: Status; }>;

  taskArray: TaskDoc[];
  setTaskArray: Action<Store, TaskDoc[]>;

  updateTask: Action<Store, { task: WithId<TaskDoc> | TaskDoc; taskIndex: number; }>;
  deleteTask: Action<Store, number>;

  contextMenuVisible: boolean;
  toggleContextMenuVisibility: Action<Store, void>;

  contextMenuCoords: [number, number];
  setContextMenuCoords: Action<Store, [number, number]>;

  moreContextMenuOptions: { name: string, function: () => void; }[];
  setMoreContextMenuOptions: Action<Store, { name: string, function: () => void; }[]>;
}

export const globalState = createStore<Store>({
  user: undefined,
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  createTaskViewSetting: { visible: false, status: "Planned" },
  setCreateTaskViewSetting: action((s, p) => {
    const newSetting = { ...p };
    s.createTaskViewSetting = newSetting;
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

  contextMenuVisible: false,
  toggleContextMenuVisibility: action((state, payload) => { state.contextMenuVisible = !state.contextMenuVisible; }),

  contextMenuCoords: [0, 0],
  setContextMenuCoords: action((state, payload) => { state.contextMenuCoords = payload; }),

  moreContextMenuOptions: [],
  setMoreContextMenuOptions: action((state, payload) => {
    state.moreContextMenuOptions = payload;
  })
});

const typedHooks = createTypedHooks<Store>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default globalState;