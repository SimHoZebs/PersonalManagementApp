//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import isLoaded from "../isLoaded";
import { useStoreActions, useStoreState } from "../globalState";

const GoalHeader = () => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);

  return (
    <header className="flex flex-col gap-y-2">
      <div className="flex text-left items-center gap-x-2">
        {isLoaded<string>(goalProps?.title) ? (
          <TextField
            className="text-4xl hover:bg-dark-400"
            placeholder="Type Goal Name Here"
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
