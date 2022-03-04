export interface Character {
	id: string;
	name: string;
	status: Status;
	species: string;
	type: string;
	gender: string;
	image: string;
	location: Location;
}

interface Location {
	id: string;
	name: string;
}

export type CharacterCardType = Pick<Character, 'id' | 'name' | 'image' | 'status'>;

export type Status = 'Alive' | 'Dead' | 'unknown';
