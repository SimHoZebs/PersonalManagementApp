import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

const SelectDateButton = () => {
  return (
    <div>
      <IconButton className="flex items-center gap-x-2">
        <div className="flex items-center gap-x-1">
          <Icon icon="mdi:calendar" className="w-5 h-5" />
          <p className="text-xs">12th Dec 2021 ~ 14th Dec 2021</p>
        </div>
        <Icon icon="akar-icons:arrow-repeat" />
      </IconButton>
    </div>
  );
};

export default SelectDateButton;
