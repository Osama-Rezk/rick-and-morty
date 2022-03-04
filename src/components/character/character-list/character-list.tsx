import Grid from '@material-ui/core/Grid';
import { CharacterCard } from '../character-card';
import { CharacterCardType, Character } from '../../../types';

export function CharacterList({ characters }: { characters: Character[] }) {
	return (
		<Grid container spacing={4}>
			{characters?.map((character: CharacterCardType) => (
				<CharacterCard key={`${character.id}_${character.name}`} character={character} />
			))}
		</Grid>
	);
}
