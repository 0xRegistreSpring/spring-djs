export type Erroptions = {
	name?: string;
	tip?: string;
};

export class SpringError extends Error {
	/**
	 * Emit errors
	 * @param {String} name
	 * @param {String} tip
	 */

	constructor(
		options: Erroptions = {
			tip: 'Join the Support Server [https://discord.gg/gRxk364D6Y]'
		}
	) {
		const msg = '"' + options.name + '"' + '\n' + 'Tip: ' + options.tip + '\n';
		super(msg);
	}
}

Object.defineProperty(SpringError.prototype, 'name', {
	value: 'SpringError'
});
