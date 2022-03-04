import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Status } from '../../../types';

type StatusColorsType = { [K: string]: string };

const useStyles = makeStyles(theme => ({
	badgeContainer: {
		padding: theme.spacing(1, 1),
		fontWeight: 700,
		lineHeight: 1,
		color: theme.palette.text.primary,
		whiteSpace: 'nowrap',
		borderRadius: theme.spacing(1, 1),
		backgroundColor: (props: { status: Status }) => {
			const statusColors: StatusColorsType = {
				alive: theme.palette.success.main,
				dead: theme.palette.error.main,
				unknown: theme.palette.text.secondary,
			};

			return statusColors[props.status.toLowerCase()];
		},
	},
}));

export function StatusBadge({ status }: { status: Status }) {
	const classes = useStyles({ status });

	return (
		<Typography component="span" variant="body2" color="textSecondary" className={classes.badgeContainer}>
			{status}
		</Typography>
	);
}
