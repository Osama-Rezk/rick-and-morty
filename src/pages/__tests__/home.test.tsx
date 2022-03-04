import { render, screen, waitForLoadingToFinish, userEvent } from '../../test/app-test-utils';
import { charactersResponse } from '../../test/data';
import App from '../../App';
import { graphql } from 'msw';
import { server } from '../../test/server';

const characterData = charactersResponse.characters.results[0];

const renderHome = () => render(<App />);

describe('Home Page', () => {
	test('Render Characters', async () => {
		renderHome();
		expect(screen.queryByText('Loading...')).toBeInTheDocument();

		await waitForLoadingToFinish();

		expect(screen.getByText(characterData.name)).toBeInTheDocument();
		expect(screen.getByText(characterData.status)).toBeInTheDocument();
	});

	test('Should Navigate to Profile Page', async () => {
		renderHome();

		userEvent.click(screen.getByText(characterData.name));

		await waitForLoadingToFinish();

		expect(screen.getByTestId('character-profile-page')).toBeInTheDocument();
	});
});

describe('Fetch Characters Failure', () => {
	//do not show console.error() message
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		console.error.mockRestore();
	});

	test('shows an error message when characters fails to load', async () => {
		server.use(
			graphql.query('GetCharacters', (_, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		renderHome();

		expect((await screen.findByRole('alert')).textContent).toMatchInlineSnapshot(
			`" Some thing bad happen while get characters, try to refresh the page "`
		);
	});
});
