import TextField, { StandardTextFieldProps } from "@mui/material/TextField";

interface Props extends StandardTextFieldProps {
  typography?: string;
}

const CustomTextField = (props: Props) => {
  const { sx, typography, ...rest } = props;

  return (
    <TextField
      variant="standard"
      sx={{
        "& .MuiInputBase-root": {
          "& .Mui-disabled": {
            WebkitTextFillColor: "white",
          },
          typography: `${typography}`,
          ":before": {
            borderBottom: 0,
          },
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
