import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
