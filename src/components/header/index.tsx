import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useSearchCharacters } from '../../utils/character';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: {
		cursor: 'pointer',
		display: 'none',

		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},

	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	homeLink: {
		textDecoration: 'none',
		color: 'white',
		'&:hover': {
			color: 'inherit',
			textDecoration: 'inherit',
		},
	},
}));

export function Header() {
	const classes = useStyles();
	const history = useHistory();
	const [searchText, setSearchText] = React.useState('');

	const { isLoading, isError, data } = useSearchCharacters(1, { name: searchText });

	function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') goToSearch(searchText);
	}

	function goToSearch(q: string) {
		history.push(`/search?q=${q}`);
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<Link to="/" className={classes.homeLink}>
						Rick n Morty
					</Link>
					<Box>
						<Autocomplete
							onChange={(_, newValue) => {
								if (typeof newValue === 'string') {
									setSearchText(newValue);
									goToSearch(newValue);
								} else if (newValue && newValue.name) {
									setSearchText(newValue.name);

									goToSearch(newValue.name);
								} else {
									setSearchText('');
								}
							}}
							selectOnFocus
							clearOnBlur
							handleHomeEndKeys
							loading={isLoading}
							size="medium"
							id="free-solo-demo"
							data-testid="auto-complete"
							freeSolo
							options={!isError && data ? data.results : []}
							getOptionLabel={option => option.name}
							renderInput={params => {
								return (
									<TextField
										style={{ width: 300, background: 'white' }}
										{...params}
										onChange={e => setSearchText(e.target.value)}
										onKeyDown={onKeyDownHandler}
										label="Search characters"
										margin="normal"
										variant="filled"
									/>
								);
							}}
						/>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}
