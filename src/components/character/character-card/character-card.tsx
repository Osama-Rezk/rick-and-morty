import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CharacterCardType } from '../../../types';
import { StatusBadge } from '../status-badge';
import { Link } from 'react-router-dom';
import { formulateCharacterUrl } from '../../../utils/url-formatter-parser';

const useStyles = makeStyles(() => ({
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%',
	},
	cardContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	cardLink: {
		color: 'inherit',
		textDecoration: 'none',
	},
}));

export function CharacterCard({ character }: { character: CharacterCardType }): JSX.Element {
	const { id, name, image, status } = character;
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Link to={`/profile/${formulateCharacterUrl({ id, name })}`} className={classes.cardLink}>
				<Card className={classes.card}>
					<CardMedia className={classes.cardMedia} image={image} title={`${name} Image`} />
					<CardContent className={classes.cardContent}>
						<Typography gutterBottom variant="h5" component="h2">
							{name}
						</Typography>

						<StatusBadge status={status} />
					</CardContent>
				</Card>
			</Link>
		</Grid>
	);
}
