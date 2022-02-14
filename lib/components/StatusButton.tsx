import { TaskProps } from "../schema/TaskSchema";
import { useStoreState } from "../globalState";

interface Props {
  statusIndex: number;
  setTask: React.Dispatch<React.SetStateAction<TaskProps>>;
}

const StatusButton = (props: Props) => {
  const statusColorArray = useStoreState(
    (state) => state.goalProps?.statusColorArray
  );
  const statusNameArray = useStoreState(
    (state) => state.goalProps?.statusArray
  );

  function toggleStatus(dir: "next" | "prev") {
    const directionArray = { next: 1, prev: -1 };

    props.setTask((prev) => {
      const index = props.statusIndex + directionArray[dir];
      return index === -1 || index === statusColorArray?.length
        ? prev
        : { ...prev, statusIndex: index };
    });
  }

  return (
    <button
      className={`min-w-20 min-h-6 flex gap-x-1 rounded py-1 px-3 text-center text-sm ${
        statusColorArray ? statusColorArray[props.statusIndex] : ""
      }`}
    >
      <button onClick={() => toggleStatus("prev")}>{"<"}</button>

      {statusNameArray ? statusNameArray[props.statusIndex] : "...loading"}

      <button onClick={() => toggleStatus("next")}>{">"}</button>
    </button>
  );
};

export default StatusButton;
