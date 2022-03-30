import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

const SelectDateButton = () => {
  return (
    <IconButton className="text-true-gray-400 hover:text-true-gray-200 flex items-center gap-x-2">
      <div className="flex items-center gap-x-1">
        <Icon icon="mdi:calendar" className="h-6 w-6 text-blue-400" />
        <p className="text-xs">12th Dec - 14th Dec 2023</p>
      </div>
    </IconButton>
  );
};

export default SelectDateButton;
