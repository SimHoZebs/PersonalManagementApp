import { useRef, useState, useContext, Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";

//components
import CustomTextField from "./CustomTextField";
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
  setGoal: Dispatch<SetStateAction<GoalSchema | undefined>>;
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
        {editingTitle ? (
          <button onClick={saveTitle}>
            <Icon icon="mdi:content-save-outline" className="h-7 w-7" />
          </button>
        ) : (
          <button onClick={editTitle}>
            <Icon icon="mdi:pencil-outline" className="w-7 h-7" />
          </button>
        )}

        {isLoaded<string>(props.title) ? (
          <CustomTextField
            className="text-3xl"
            ref={titleRef}
            placeholder="Type Goal Name Here"
            onFocus={editTitle}
            onBlur={saveTitle}
            value={props.title}
            onChange={(e) =>
              props.setGoal(
                (prev) => ({ title: e.target.value, ...prev } as GoalSchema)
              )
            }
          />
        ) : (
          <Skeleton />
        )}
      </div>

      <div className="flex text-left items-center gap-x-2">
        {editingDesc ? (
          <button onClick={saveDesc}>
            <Icon icon="mdi:content-save-outline" className="h-7 w-7" />
          </button>
        ) : (
          <button onClick={editDesc}>
            <Icon icon="mdi:pencil-outline" className="w-7 h-7" />
          </button>
        )}

        {isLoaded<string>(props.description) ? (
          <CustomTextField
            placeholder="Add a description"
            ref={descRef}
            onFocus={editDesc}
            onBlur={saveDesc}
            value={props.description}
            onChange={(e) =>
              props.setGoal(
                (prev) =>
                  ({ description: e.target.value, ...prev } as GoalSchema)
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
