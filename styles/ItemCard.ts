import { Theme } from '@material-ui/core/styles';

import makeStyles from '@material-ui/styles/makeStyles';
import createStyles from '@material-ui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({

		cardWrapper: {
		},

		card: {
			height: "85vh"
		},
		cardContent: {
			padding: 15
		}
	})
);

export default useStyles
