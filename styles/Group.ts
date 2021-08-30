import { Theme } from '@material-ui/core/styles';

import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(createStyles({
  backdrop: {
    zIndex: 1200 + 1
  }
})
);

export default useStyles
