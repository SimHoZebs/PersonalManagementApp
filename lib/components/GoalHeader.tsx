import { useRef, useState, useContext } from "react";
import { Icon } from "@iconify/react";

//components
import CustomTextField from "./CustomTextField";
import Skeleton from "./Skeleton";

//etc
import updateList from "../api/updateGoal";
import isLoaded from "../isLoaded";
import { UserContext } from "../../pages/user/[userId]";

interface Props {
  goalId: string;
  currGoalTitle: string | undefined;
  description: string | undefined;
  setCurrGoalTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ListHeader = (props: Props) => {
  const user = useContext(UserContext);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  async function saveTitle() {
    if (isLoaded<string>(props.currGoalTitle)) {
      setEditingTitle(false);

      await updateList(
        user?._id,
        props.goalId,
        "goalTitle",
        props.currGoalTitle
      );
    }
  }

  function editTitle() {
    setEditingTitle(() => true);
    titleRef.current?.focus();
  }

  async function saveDesc() {
    if (isLoaded<string>(props.description)) {
      setEditingDesc(false);

      await updateList(
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

        {isLoaded<string>(props.currGoalTitle) ? (
          <CustomTextField
            className="text-3xl"
            ref={titleRef}
            placeholder="Type List Name Here"
            onFocus={editTitle}
            onBlur={saveTitle}
            value={props.currGoalTitle}
            onChange={(e) => props.setCurrGoalTitle(e.target.value)}
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
            onChange={(e) => props.setDescription(e.target.value)}
          />
        ) : (
          <Skeleton />
        )}
      </div>
    </header>
  );
};

export default ListHeader;
