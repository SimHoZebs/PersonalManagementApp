import { Theme } from "@material-ui/core/styles";

import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import zIndex from '@material-ui/core/styles/zIndex';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 30
    },

    backdrop: {
      zIndex: 1200 + 1
    }
  }))