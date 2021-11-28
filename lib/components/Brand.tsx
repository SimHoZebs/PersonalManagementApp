import ClipboardCheck from "../icons/ClipboardCheck";

const Brand = () => {
  return (
    <div className="flex flex-row gap-x-1">
      <div className="text-blue-400 h-7 w-7">
        <ClipboardCheck />
      </div>
      <p className="font-medium text-lg">AnotherToDoList</p>
    </div>
  );
};

export default Brand;
