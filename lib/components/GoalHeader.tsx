import { useRef } from "react";

//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import isLoaded from "../isLoaded";
import { GoalProps, GoalSchema } from "../schema/GoalSchema";

interface Props {
  goalId: string;
  title: string | undefined;
  description: string | undefined;
  userId: string;
  setGoalProps: React.Dispatch<React.SetStateAction<GoalProps | undefined>>;
}

const GoalHeader = (props: Props) => {
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
        {isLoaded<string>(props.title) ? (
          <TextField
            className="text-4xl hover:bg-dark-400"
            ref={titleRef}
            placeholder="Type Goal Name Here"
            onFocus={editTitle}
            value={props.title}
            onChange={(e) =>
              props.setGoalProps(
                (prev) => ({ ...prev, title: e.target.value } as GoalSchema)
              )
            }
          />
        ) : (
          <Skeleton />
        )}
      </div>

      <div className="flex text-left items-center gap-x-2">
        {isLoaded<string>(props.description) ? (
          <TextField
            className="hover:bg-dark-400"
            placeholder="Add a description"
            ref={descRef}
            onFocus={editDesc}
            value={props.description}
            onChange={(e) =>
              props.setGoalProps(
                (prev) =>
                  ({ ...prev, description: e.target.value } as GoalSchema)
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
