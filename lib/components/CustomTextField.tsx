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

const CustomTextField = (
  props: Props,
  ref: ForwardedRef<HTMLInputElement> | undefined
) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      type="text"
      className={`bg-transparent p-1 text-xl hover:bg-dark-200 focus-visible:(outline-transparent bg-dark-200) ${className}`}
      {...rest}
    />
  );
};

export default forwardRef(CustomTextField);
