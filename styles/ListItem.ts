import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			padding: 0
		},

		content: {
			paddingLeft: 15,
			paddingRight: 15,
			paddingTop: 20,
			paddingBottom: 20,
		}
	})
)

export default useStyles