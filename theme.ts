import { createTheme, adaptV4Theme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme(adaptV4Theme({
  palette: {
    mode: 'dark'
  },
}));

export default theme;
