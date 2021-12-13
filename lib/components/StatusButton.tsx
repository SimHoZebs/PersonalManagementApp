import { Icon } from "@iconify/react";

const StatusButton = () => {
  return (
    <div className="flex flex-col gap-1">
      <Icon icon="akar-icons:chevron-up" className="h-4 w-4" />
      <div className="h-4 w-4 bg-purple-400 rounded-sm"></div>
      <Icon icon="akar-icons:chevron-down" className="h-4 w-4" />
    </div>
  );
};

export default StatusButton;
