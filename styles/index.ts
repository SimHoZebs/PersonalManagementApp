import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: 30
		},

		backdrop: {
			zIndex: theme.zIndex.drawer + 1
		}
	}))