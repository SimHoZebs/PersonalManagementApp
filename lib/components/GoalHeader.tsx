import { useRef } from "react";

//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import isLoaded from "../isLoaded";
import { useStoreActions, useStoreState } from "../../pages/_app";

const GoalHeader = () => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  function editTitle() {
    titleRef.current?.focus();
  }

  async function editDesc() {
    descRef.current?.focus();
  }

  return (
    <header className="flex flex-col gap-y-2">
      <div className="flex text-left items-center gap-x-2">
        {isLoaded<string>(goalProps?.title) ? (
          <TextField
            className="text-4xl hover:bg-dark-400"
            ref={titleRef}
            placeholder="Type Goal Name Here"
            onFocus={editTitle}
            value={goalProps?.title}
            onChange={(e) =>
              setGoalProps(
                goalProps ? { ...goalProps, title: e.target.value } : goalProps
              )
            }
          />
        ) : (
          <Skeleton />
        )}
      </div>

      <div className="flex text-left items-center gap-x-2">
        {isLoaded<string>(goalProps?.description) ? (
          <TextField
            className="hover:bg-dark-400"
            placeholder="Add a description"
            ref={descRef}
            onFocus={editDesc}
            value={goalProps?.description}
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
      </div>
    </header>
  );
};

export default GoalHeader;
