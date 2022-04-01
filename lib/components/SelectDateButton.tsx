import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

const SelectDateButton = () => {
  return (
    <IconButton className="flex text-true-gray-400 gap-x-2 items-center hover:text-true-gray-200">
      <div className="flex gap-x-1 items-center">
        <Icon icon="mdi:calendar" className="h-6 text-primary w-6" />
        <p className="text-xs">12th Dec - 14th Dec 2023</p>
      </div>
    </IconButton>
  );
};

export default SelectDateButton;
