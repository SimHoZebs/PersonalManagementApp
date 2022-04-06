import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

const SelectDateButton = () => {
  return (
    <IconButton className="text-true-gray-400 items-center group hover:text-true-gray-300">
      <Icon
        icon="mdi:calendar"
        className="h-6 text-primary w-6 duration-100 group-hover:text-primary-hover"
      />
      12 Dec - 14 Dec 2023
    </IconButton>
  );
};

export default SelectDateButton;
