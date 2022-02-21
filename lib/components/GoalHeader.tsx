import { useRef, useState } from "react";
//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import narrowType from "../narrowType";
import { useStoreActions, useStoreState } from "../globalState";
import { GoalBasicProps } from "../schema/GoalSchema";
import MultiLineTextField from "./MultiLineTextField";

const GoalHeader = () => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);

  return (
    <header className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2 text-left">
        {narrowType<GoalBasicProps>(goalProps) ? (
          <TextField
            className="hover:bg-dark-400 placeholder-true-gray-400 text-4xl"
            placeholder="Type Goal Name Here"
            size={goalProps.title.length <= 0 ? 1 : goalProps.title.length}
            value={goalProps.title}
            onChange={(e) =>
              setGoalProps({ ...goalProps, title: e.currentTarget.value })
            }
          />
        ) : (
          <Skeleton />
        )}
      </div>

      {narrowType<GoalBasicProps>(goalProps) ? (
        <MultiLineTextField
          value={goalProps.description}
          onChange={(e) =>
            setGoalProps(
              goalProps
                ? { ...goalProps, description: e.target.value }
                : goalProps
            )
          }
        />
      ) : (
        <Skeleton />
      )}
    </header>
  );
};

export default GoalHeader;
