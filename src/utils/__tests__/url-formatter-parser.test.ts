import { getIdFromCharacterUrlParamter, formulateCharacterUrl } from '../url-formatter-parser';

describe('url-formatter-parser utility testing', () => {
	test('getIdFromCharacterUrlParamter should return the id from the url parameter', () => {
		expect(getIdFromCharacterUrlParamter('1-rick')).toBe('1');
	});

	test('formulateCharacterUrl should format url', () => {
		expect(formulateCharacterUrl({ id: '1', name: 'Rick sanchez' })).toBe('1-rick-sanchez');
	});
});
