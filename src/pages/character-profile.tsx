import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';

import { useSetRecoilState } from 'recoil';
import { useCharacter } from '../utils/character';
import { getIdFromCharacterUrlParamter } from '../utils/url-formatter-parser';
import { HomeRouterButton } from '../components';
import { recentVisitedCharacters } from '../atoms';

const MAX_RECENT_VISITED_CHARACTERS = 10;
const LAST_INDEX = MAX_RECENT_VISITED_CHARACTERS - 1;

const useStyles = makeStyles(theme =>
	createStyles({
		cardMedia: {
			height: '300px',
		},
		infoRow: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			padding: theme.spacing(1),
			backgroundColor: '#f5f5f5',
			margin: theme.spacing(1),
			borderRadius: theme.spacing(1),
		},
	})
);

export default function CharacterProfile() {
	const classes = useStyles();

	const { id_name } = useParams<{ id_name: string }>();

	const id = getIdFromCharacterUrlParamter(id_name);

	const { isLoading, isError, data } = useCharacter(id);

	const setRecentVisitedCharacters = useSetRecoilState(recentVisitedCharacters);

	//to extracted hook consume selectors to be reusable and abstracted
	useEffect(() => {
		if (data && !isLoading) {
			setRecentVisitedCharacters(prevCharacters => {
				let newCharacters = [...prevCharacters];

				let elementIndex = newCharacters.findIndex(c => c.id === data.id);

				if (elementIndex > -1) {
					newCharacters.splice(elementIndex, 1);
				} else if (newCharacters.length >= MAX_RECENT_VISITED_CHARACTERS) {
					newCharacters.splice(LAST_INDEX, 1);
				}

				return [data, ...newCharacters];
			});
		}
	}, [isLoading, data, setRecentVisitedCharacters]);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data) return <Alert severity="error">Character does not exist Or error happen</Alert>;

	const { image, name, gender, status, location, species, type } = data;

	return (
		<div data-testid="character-profile-page">
			<Helmet title={name} />
			<HomeRouterButton />
			<Paper>
				<Grid container>
					<Grid item xs={12} sm={6} md={6}>
						<CardMedia className={classes.cardMedia} image={image} title={`${name} Image`} />
					</Grid>

					<Grid item xs={12} sm={6} md={6}>
						<CharacterInfoRow title={'name'} value={name} />
						<CharacterInfoRow title={'Gender'} value={gender} />
						<CharacterInfoRow title={'Status'} value={status} />
						<CharacterInfoRow title={'Location'} value={location.name} />
						<CharacterInfoRow title={'Species'} value={species} />
						<CharacterInfoRow title={'Type'} value={type} />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

function CharacterInfoRow({ title, value }: { title: string; value: string }) {
	const classes = useStyles();

	return (
		<Box className={classes.infoRow}>
			<Typography>{title}: </Typography>
			<Typography> {value}</Typography>
		</Box>
	);
}
