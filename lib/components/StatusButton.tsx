import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import IconButton from "./IconButton";
import { TaskSchema } from "../schema/TaskSchema";

interface Props {
  statusIndex: number;
  statusColorArray: string[];
  setTask: React.Dispatch<React.SetStateAction<TaskSchema>>;
}

const StatusButton = (props: Props) => {
  const [statusColor, setStatusColor] = useState(
    props.statusColorArray[props.statusIndex]
  );

  useEffect(() => {
    setStatusColor((prev) => props.statusColorArray[props.statusIndex]);
  }, [props.statusIndex, props.statusColorArray]);

  function toggleStatus(dir: "next" | "prev") {
    const directionArray = { next: 1, prev: -1 };

    props.setTask((prev) => {
      const index = props.statusIndex + directionArray[dir];
      return index === -1 || index === props.statusColorArray.length
        ? prev
        : ({ ...prev, statusIndex: index } as TaskSchema);
    });
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <IconButton className="p-1" onClick={() => toggleStatus("prev")}>
        <Icon icon="entypo:chevron-up" className="h-6 w-6" />
      </IconButton>
      <button className={`h-4 w-4 rounded-sm ${statusColor}`}></button>
      <IconButton className="p-1" onClick={() => toggleStatus("next")}>
        <Icon icon="entypo:chevron-down" className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default StatusButton;
