import { useEffect } from "react";
import { Icon } from "@iconify/react";

interface Props {
  statusColor: string;
}

const StatusButton = (props: Props) => {
  useEffect(() => {}, [props.statusColor]);

  return (
    <div className="flex flex-col gap-1 items-center">
      <Icon icon="entypo:chevron-up" className="h-6 w-6" />
      <div className={`h-4 w-4 rounded-sm ${props.statusColor}`}></div>
      <Icon icon="entypo:chevron-down" className="h-6 w-6" />
    </div>
  );
};

export default StatusButton;
