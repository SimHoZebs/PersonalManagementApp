import { useState } from "react";

import { Icon } from "@iconify/react";
import IconButton from "./IconButton";
import ContextMenuBase from "./ContextMenuBase";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  options: { name: string; function: () => void }[];
}

const MoreOptionsButton = (props: Props) => {
  const [moreOptionsHidden, setMoreOptions] = useState(true);

  return (
    <div className="relative">
      <IconButton onClick={() => setMoreOptions((prev) => !prev)} {...props}>
        <Icon icon="mdi:dots-vertical" className="text-true-gray-400 h-4 w-4" />
      </IconButton>

      <ContextMenuBase
        className={
          " translate-x-3 transform" + `${moreOptionsHidden ? " hidden" : ""}`
        }
      >
        {props.options.map((option, index) => (
          <li key={index}>
            <button onClick={option.function}>{option.name}</button>
          </li>
        ))}
      </ContextMenuBase>
    </div>
  );
};

export default MoreOptionsButton;
