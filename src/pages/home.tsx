import { useState, ChangeEvent } from 'react';
import { CharacterList } from '../components';
import { useCharacters } from '../utils/character';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { Helmet } from 'react-helmet';

export default function Home() {
	const [page, setPage] = useState(0);

	const { isLoading, isError, data } = useCharacters(page);

	if (isLoading) return <div>Loading...</div>;

	if (isError || !data)
		return <Alert severity="error"> Some thing bad happen while get characters, try to refresh the page </Alert>;

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Helmet title={`Rick n Morty Directory`} />

			<CharacterList characters={data.results} />
			<Box margin={2}>
				<Pagination
					data-testid="home-pagination"
					page={page}
					count={data.info.pages}
					size="large"
					variant="outlined"
					shape="rounded"
					onChange={(_: ChangeEvent<unknown>, p: number) => setPage(p)}
				/>
			</Box>
		</Box>
	);
}
