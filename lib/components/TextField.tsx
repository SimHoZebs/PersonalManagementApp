import { forwardRef } from "react";

const TextField = (
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement> | undefined
) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      type="text"
      className={
        "focus-visible:outline-none bg-transparent px-2 py-1 text-xl " +
        className
      }
      onClick={(e) => e.stopPropagation()}
      {...rest}
    />
  );
};

export default forwardRef(TextField);
