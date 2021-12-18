import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  ForwardedRef,
} from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const TextField = (
  props: Props,
  ref: ForwardedRef<HTMLInputElement> | undefined
) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      type="text"
      className={`bg-transparent px-2 py-1 rounded-sm text-xl hover:bg-dark-300 focus-visible:(outline-transparent bg-dark-200) ${className}`}
      {...rest}
    />
  );
};

export default forwardRef(TextField);
