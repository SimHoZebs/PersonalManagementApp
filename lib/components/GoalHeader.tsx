import { useRef, useState, useContext } from "react";

//components
import TextField from "./TextField";
import Skeleton from "./Skeleton";

//etc
import updateGoal from "../api/updateGoal";
import isLoaded from "../isLoaded";
import { UserContext } from "../../pages/user/[userId]";
import { GoalSchema } from "../schema/GoalSchema";

interface Props {
  goalId: string;
  title: string | undefined;
  description: string | undefined;
  setGoal: React.Dispatch<React.SetStateAction<GoalSchema | undefined>>;
}

const GoalHeader = (props: Props) => {
  const user = useContext(UserContext);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  async function saveTitle() {
    if (isLoaded<string>(props.title)) {
      setEditingTitle(false);

      await updateGoal(user?._id, props.goalId, "title", props.title);
    }
  }

  function editTitle() {
    setEditingTitle(() => true);
    titleRef.current?.focus();
  }

  async function saveDesc() {
    if (isLoaded<string>(props.description)) {
      setEditingDesc(false);

      await updateGoal(
        user?._id,
        props.goalId,
        "description",
        props.description
      );
    }
  }

  async function editDesc() {
    setEditingDesc(() => true);
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
            onBlur={saveTitle}
            value={props.title}
            onChange={(e) =>
              props.setGoal(
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
            onBlur={saveDesc}
            value={props.description}
            onChange={(e) =>
              props.setGoal(
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
