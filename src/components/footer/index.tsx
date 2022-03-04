import { makeStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';
import Grid from '@material-ui/core/Grid';
import { recentVisitedCharacters } from '../../atoms';
import { Link } from 'react-router-dom';
import { formulateCharacterUrl } from '../../utils/url-formatter-parser';

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6, 0),
	},
	characterLink: {
		padding: theme.spacing(1),
	},
}));

export function Footer() {
	const classes = useStyles();

	const lastVisitedCharacters = useRecoilValue(recentVisitedCharacters);

	return (
		<footer className={classes.footer}>
			{Boolean(lastVisitedCharacters.length) && (
				<Grid container>
					{lastVisitedCharacters.map(({ name, id }) => (
						<Grid item xs={12} sm={4} md={6} lg={4} key={`${id}_${name}`}>
							<Link
								className={classes.characterLink}
								to={`/profile/${formulateCharacterUrl({ id, name })}`}>
								{name}
							</Link>
						</Grid>
					))}
				</Grid>
			)}
		</footer>
	);
}
