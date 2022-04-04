import { Icon } from "@iconify/react";
import IconButton from "./IconButton";
import { useStoreActions } from "../globalState";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  options: { name: string; function: () => void }[];
}

const MoreOptionsButton = (props: Props) => {
  const setMoreContextMenuOptions = useStoreActions(
    (a) => a.setMoreContextMenuOptions
  );
  const setContextMenuVisibility = useStoreActions(
    (a) => a.setContextMenuVisibility
  );

  const setContextMenuCoords = useStoreActions((a) => a.setContextMenuCoords);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <IconButton
        onClick={(e) => {
          setMoreContextMenuOptions(props.options);
          setContextMenuCoords([e.clientX, e.clientY]);
          setContextMenuVisibility(true);
        }}
        {...props}
      >
        <Icon icon="mdi:dots-vertical" className="h-4 text-true-gray-400 w-4" />
      </IconButton>
    </div>
  );
};

export default MoreOptionsButton;
