import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: 0
		},

		backdrop: {
			zIndex: theme.zIndex.drawer + 1
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