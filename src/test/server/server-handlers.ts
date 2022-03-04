import { graphql } from 'msw';

import { characterResponse, charactersResponse } from '../data';

const handlers = [
	graphql.query('GetCharacters', (_, res, ctx) => {
		return res(ctx.data(charactersResponse));
	}),
	graphql.query('GetCharacter', (_, res, ctx) => {
		return res(ctx.data(characterResponse));
	}),

	graphql.query('SearchCharacters', (_, res, ctx) => {
		return res(ctx.data(charactersResponse));
	}),
];

export { handlers };
