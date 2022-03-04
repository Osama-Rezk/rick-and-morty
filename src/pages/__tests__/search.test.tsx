import { render, screen, waitForLoadingToFinish } from '../../test/app-test-utils';
import { charactersResponse } from '../../test/data';
import App from '../../App';
import { graphql } from 'msw';
import { server } from '../../test/server';

const characterData = charactersResponse.characters.results[0];

const renderSearchPage = () => render(<App />, { route: '/search?q=Rick' });

describe('Search Page', () => {
	test('Render Search Result', async () => {
		renderSearchPage();
		expect(screen.queryByText('Loading...')).toBeInTheDocument();

		await waitForLoadingToFinish();

		expect(screen.getByTestId('search-statics').textContent).toMatchInlineSnapshot(`"About 671 results"`);
		expect(screen.getByText(characterData.status)).toBeInTheDocument();
		expect(screen.getByText(characterData.name)).toBeInTheDocument();
	});
});

describe('Search Failed', () => {
	//do not show console.error() message
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		console.error.mockRestore();
	});

	test('shows an error message when Search fails', async () => {
		server.use(
			graphql.query('SearchCharacters', (_, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		renderSearchPage();

		expect((await screen.findByRole('alert')).textContent).toMatchInlineSnapshot(`"An error has occurred"`);
	});
});
