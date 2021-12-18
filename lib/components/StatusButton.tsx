import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

interface Props {
  statusIndex: number;
  statusColorArray: string[];
}

const StatusButton = (props: Props) => {
  const [statusColor, setStatusColor] = useState(props.statusColorArray[0]);

  return (
    <div className="flex flex-col gap-1 items-center">
      <IconButton className="p-1">
        <Icon icon="entypo:chevron-up" className="h-6 w-6" />
      </IconButton>
      <button className={`h-4 w-4 rounded-sm ${statusColor}`}></button>
      <IconButton className="p-1">
        <Icon icon="entypo:chevron-down" className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default StatusButton;
