import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';

import { AppProviders } from './context';
import Home from './pages/home';
import SearchCharacters from './pages/search-charcters';
import { Header, Footer } from './components';
import CharacterProfile from './pages/character-profile';

export default function App() {
	return (
		<AppProviders>
			<CssBaseline />
			<Container maxWidth="lg">
				<Header />
				<Box component="main" margin="10px 0px">
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/profile/:id_name" exact>
							<CharacterProfile />
						</Route>

						<Route path="/search" exact>
							<SearchCharacters />
						</Route>

						<Route path="/page/:pageNumber" exact>
							Page X
						</Route>
					</Switch>
				</Box>
				<Footer />
			</Container>
		</AppProviders>
	);
}
