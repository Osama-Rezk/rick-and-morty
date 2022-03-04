import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { Character } from '../types';

const endpoint = 'https://rickandmortyapi.com/graphql';

interface Info {
	count: number;
	pages: number;
	next: number;
	prev: number;
}

interface CharactersResponse {
	info: Info;
	results: Character[];
}

const CHARACTERS_QUERY = gql`
	query GetCharacters($page: Int) {
		characters(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				name
				id
				image
				status
			}
		}
	}
`;

export function useCharacters(page: number) {
	return useQuery<CharactersResponse>(['characters-list', page], async () => {
		const { characters: data } = await request(endpoint, CHARACTERS_QUERY, { page });
		return data;
	});
}

type FilterCharacter = {
	name: string;
	status: string;
	species: string;
	type: string;
	gender: string;
};

const CHARACTERS_SEARCH_QUERY = gql`
	query SearchCharacters($page: Int, $filter: FilterCharacter) {
		characters(page: $page, filter: $filter) {
			info {
				count
				pages
				next
				prev
			}
			results {
				name
				id
				image
				status
			}
		}
	}
`;

export function useSearchCharacters(page: number, filter: Partial<FilterCharacter>) {
	return useQuery<CharactersResponse>(['characters-search', page, filter], async () => {
		const { characters: data } = await request(endpoint, CHARACTERS_SEARCH_QUERY, { page, filter });
		return data;
	});
}

const CHARACTER_QUERY = gql`
	query GetCharacter($id: ID!) {
		character(id: $id) {
			id
			name
			image
			status
			species
			type
			gender
			location {
				name
			}
		}
	}
`;

export function useCharacter(id: string) {
	return useQuery<Character>(['character', id], async () => {
		const { character } = await request(endpoint, CHARACTER_QUERY, { id });
		return character;
	});
}
