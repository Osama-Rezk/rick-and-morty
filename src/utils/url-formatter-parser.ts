export function formulateCharacterUrl({ id, name }: { id: string; name: string }): string {
	return `${id}-${name.toLowerCase().replace(/\s/g, '-')}`;
}

export function getIdFromCharacterUrlParamter(paramter: string): string {
	return paramter?.split('-')[0];
}
