import { Icon } from "@iconify/react";
import IconButton from "./IconButton";
import { TaskProps } from "../schema/TaskSchema";
import { useStoreState } from "../../pages/_app";

interface Props {
  statusIndex: number;
  setTask: React.Dispatch<React.SetStateAction<TaskProps>>;
}

const StatusButton = (props: Props) => {
  const statusColorArray = useStoreState(
    (state) => state.goalProps?.statusColorArray
  );

  function toggleStatus(dir: "next" | "prev") {
    const directionArray = { next: 1, prev: -1 };

    props.setTask((prev) => {
      const index = props.statusIndex + directionArray[dir];
      return index === -1 || index === statusColorArray?.length
        ? prev
        : { ...prev, statusIndex: index };
    });
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <IconButton className="p-1" onClick={() => toggleStatus("prev")}>
        <Icon icon="entypo:chevron-up" className="h-6 w-6" />
      </IconButton>
      <button
        className={`h-4 w-4 rounded-sm ${
          statusColorArray ? statusColorArray[props.statusIndex] : ""
        }`}
      ></button>
      <IconButton className="p-1" onClick={() => toggleStatus("next")}>
        <Icon icon="entypo:chevron-down" className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default StatusButton;
