export const charactersResponse = {
	characters: {
		info: {
			count: 671,
			next: 2,
			pages: 34,
			prev: null,
		},
		results: [
			{
				id: '1',
				image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
				name: 'Rick Sanchez',
				status: 'Alive',
			},
		],
	},
};

export const characterResponse = {
	character: {
		id: '1',
		name: 'Rick Sanchez',
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
		status: 'Alive',
		species: 'Human',
		type: '',
		gender: 'Male',
		location: { name: 'Earth (Replacement Dimension)' },
	},
};
