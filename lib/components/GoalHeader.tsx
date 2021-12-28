import { useRef } from "react";

//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import isLoaded from "../isLoaded";
import { GoalBasicProps } from "../schema/GoalSchema";

interface Props {
  goalId: string | undefined;
  title: string | undefined;
  description: string | undefined;
  userId: string;
  setGoalProps: React.Dispatch<
    React.SetStateAction<GoalBasicProps | undefined>
  >;
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
              props.setGoalProps((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
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
              props.setGoalProps((prev) =>
                prev ? { ...prev, description: e.target.value } : prev
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
