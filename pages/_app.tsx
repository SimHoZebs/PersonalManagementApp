import * as React from "react";
import Head from "next/head";
import {
  Action,
  action,
  createStore,
  createTypedHooks,
  StoreProvider,
} from "easy-peasy";
import { AppProps } from "next/app";
import "windi.css";

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
  updateTask: Action<Store, { task: TaskProps; taskIndex: number }>;
}

const store = createStore<Store>({
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
});

const typedHooks = createTypedHooks<Store>();
export const useStoreState = typedHooks.useStoreState;
export const useStoreActions = typedHooks.useStoreActions;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title key="title">LifeOrb</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StoreProvider store={store}>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
