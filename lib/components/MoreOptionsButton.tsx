import { Icon } from "@iconify/react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const MoreOptionsButton = (props: Props) => {
  return (
    <button className="hover:bg-dark-300 rounded-full p-2" {...props}>
      <Icon icon="mdi:dots-vertical" className="h-4 w-4 text-gray-600" />
    </button>
  );
};

export default MoreOptionsButton;
