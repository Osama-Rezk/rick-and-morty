import { atom } from 'recoil';
import { Character } from './types';

export const recentVisitedCharacters = atom<Character[]>({
	key: 'recent-visited-characters',
	default: [],
});
