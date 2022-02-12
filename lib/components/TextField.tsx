import { forwardRef } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const TextField = (
  props: Props,
  ref: React.ForwardedRef<HTMLInputElement> | undefined
) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      type="text"
      className={`hover:bg-dark-300 focus-visible:(outline-transparent bg-dark-200) rounded bg-transparent px-2 py-1 text-xl ${className}`}
      {...rest}
    />
  );
};

export default forwardRef(TextField);
