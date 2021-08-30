import { Theme } from "@material-ui/core/styles";

import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0
    },

    backdrop: {
      zIndex: 1200 + 1
    },

    actionArea: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 20,
      paddingBottom: 20,
    },


  })
)

export default useStyles