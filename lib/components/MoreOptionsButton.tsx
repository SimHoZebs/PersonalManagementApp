import { Icon } from "@iconify/react";
import IconButton from "./IconButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const MoreOptionsButton = (props: Props) => {
  return (
    <IconButton>
      <Icon icon="mdi:dots-vertical" className="h-4 w-4 text-gray-600" />
    </IconButton>
  );
};

export default MoreOptionsButton;
