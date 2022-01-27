import { useState } from "react";

import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  options: { option: string; function: () => void }[];
}

const MoreOptionsButton = (props: Props) => {
  const [moreOptionsHidden, setMoreOptions] = useState(true);

  return (
    <div className="relative">
      <IconButton onClick={() => setMoreOptions((prev) => !prev)} {...props}>
        <Icon icon="mdi:dots-vertical" className="h-4 w-4 text-gray-600" />
      </IconButton>

      <ul
        className={
          "absolute bg-dark-500 px-2 py-1 text-xs flex flex-col gap-y-1" +
          `${moreOptionsHidden ? " hidden" : ""}`
        }
      >
        {props.options.map((option, index) => (
          <li key={index}>
            <button onClick={option.function}>{option.option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoreOptionsButton;
