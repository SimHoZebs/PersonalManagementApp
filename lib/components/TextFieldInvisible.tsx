import TextField, { TextFieldProps } from "@mui/material/TextField";
import theme from "../theme";

const TextFieldInvisible = (props: TextFieldProps) => {
  return (
    <TextField
      variant="standard"
      value={props.value}
      onChange={props.onChange}
      sx={{
        "& .MuiInputBase-root": {
          fontSize: theme.typography.h3.fontSize,
          ":before": {
            borderBottom: 0,
          },
          ":after": {
            borderBottom: 0,
          },
          ":hover": {
            borderBottom: 0,
            ":not(.Mui-disabled)": {
              ":before": {
                borderBottom: 0,
              },
            },
          },
        },
      }}
    />
  );
};

export default TextFieldInvisible;
