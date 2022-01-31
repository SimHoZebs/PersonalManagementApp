//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import isLoaded from "../isLoaded";
import { useStoreActions, useStoreState } from "../globalState";
import { GoalBasicProps } from "../schema/GoalSchema";

const GoalHeader = () => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);

  return (
    <header className="flex flex-col gap-y-2">
      <div className="flex text-left items-center gap-x-2">
        {isLoaded<GoalBasicProps>(goalProps) ? (
          <TextField
            className="text-4xl hover:bg-dark-400 placeholder-true-gray-400"
            placeholder="Type Goal Name Here"
            size={goalProps.title.length <= 0 ? 1 : goalProps.title.length}
            value={goalProps.title}
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
        {isLoaded<GoalBasicProps>(goalProps) ? (
          <TextField
            size={
              goalProps.description.length <= 15
                ? 15
                : goalProps.description.length
            }
            className="hover:bg-dark-400 placeholder-true-gray-400"
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
