/**
 * Transforms Time string to milliseconds ;)
 * @param str

 */

export function ms(str: string) {
	let sum = 0,
		time,
		type,
		val;

	str = str
		.replaceAll('week', 'w')
		.replaceAll('weeks', 'w')
		.replaceAll('day', 'd')
		.replaceAll('days', 'd')
		.replaceAll('hour', 'h')
		.replaceAll('hours', 'h')
		.replaceAll('minute', 'm')
		.replaceAll('minutes', 'm')
		.replaceAll('min', 'm')
		.replaceAll('second', 's')
		.replaceAll('seconds', 's')
		.replaceAll('sec', 's');

	const arr: string[] = ('' + str)
		.split(' ')
		.filter((v) => v != '' && /^(\d{1,}\.)?\d{1,}([wdhms])?$/i.test(v));

	const length = arr.length;

	for (let i = 0; i < length; i++) {
		time = arr[i];
		type = time.match(/[wdhms]$/i);

		if (type) {
			val = Number(time.replace(type[0], ''));

			switch (type[0].toLowerCase()) {
				case 'w':
					sum += val * 604800000;
					break;
				case 'd':
					sum += val * 86400000;
					break;
				case 'h':
					sum += val * 3600000;
					break;
				case 'm':
					sum += val * 60000;
					break;
				case 's':
					sum += val * 1000;
					break;
			}
		} else if (!isNaN(parseFloat(time)) && isFinite(parseFloat(time))) {
			sum += parseFloat(time);
		}
	}
	return sum;
}
