/**
 * Transforms Hex code into RGB Array (or) RGB String. This makes it easy to convert from discord.js v13 to v14.
 * @param hex
 * @param type
 */

export function toRgb(
	hex: string,
	type: 'Array' | 'String' = 'Array'
): number[] | string {
	const red = parseInt(hex.slice(1, 3), 16);
	const green = parseInt(hex.slice(3, 4), 16);
	const blue = parseInt(hex.slice(5, 7), 16);
	if (type === 'Array') return [red, green, blue];
	else if (type === 'String') return `rgb(${red}, ${green}, ${blue})`;
}
