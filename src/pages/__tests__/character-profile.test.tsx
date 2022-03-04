import { render, screen, waitForLoadingToFinish, userEvent } from '../../test/app-test-utils';
import { characterResponse } from '../../test/data';
import App from '../../App';
import { graphql } from 'msw';
import { server } from '../../test/server';

const characterData = characterResponse.character;

const renderCharacterPage = () => render(<App />, { route: '/profile/1-rick-sanchez' });

describe('Profile Page', () => {
	test('Render Character Details And Render Character Name in footer also', async () => {
		renderCharacterPage();
		expect(screen.queryByText('Loading...')).toBeInTheDocument();

		await waitForLoadingToFinish();

		expect(screen.getAllByText(characterData.name)).toHaveLength(2);
		expect(screen.getByText(characterData.status)).toBeInTheDocument();
		expect(screen.getByText(characterData.gender)).toBeInTheDocument();
		expect(screen.getByText(characterData.species)).toBeInTheDocument();
		expect(screen.getByText(characterData.location.name)).toBeInTheDocument();
	});
});

describe('Profile Not Exist', () => {
	//do not show console.error() message
	beforeAll(() => {
		jest.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterAll(() => {
		console.error.mockRestore();
	});

	test('shows an error message when character fails to load or not found', async () => {
		server.use(
			graphql.query('GetCharacter', (_, res, ctx) => {
				return res(ctx.status(404));
			})
		);

		renderCharacterPage();

		expect((await screen.findByRole('alert')).textContent).toMatchInlineSnapshot(
			`"Character does not exist Or error happen"`
		);
	});
});
