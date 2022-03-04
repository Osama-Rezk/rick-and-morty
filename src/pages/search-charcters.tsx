import { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

import { CharacterList } from '../components';
import { useSearchCharacters } from '../utils/character';

export default function SearchCharacters() {
	const [page, setPage] = useState(1);

	const location = useLocation();

	const { q: query } = queryString.parse(location.search) as { q: string | undefined };

	const { isLoading, isError, data } = useSearchCharacters(page, { name: query || '' });

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <Alert severity="error">An error has occurred</Alert>;

	if (!data) return <div>No Search result</div>;

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<Helmet title={`${query} - characters search`} />
			<Box alignSelf="flex-start" data-testid="search-statics" margin={1}>
				About {data.info.count} results
			</Box>

			<CharacterList characters={data.results} />
			{data.info.next && (
				<Box margin={2}>
					<Pagination
						page={page}
						count={data.info.pages}
						size="large"
						variant="outlined"
						shape="rounded"
						onChange={(_: ChangeEvent<unknown>, p: number) => setPage(p)}
					/>
				</Box>
			)}
		</Box>
	);
}
