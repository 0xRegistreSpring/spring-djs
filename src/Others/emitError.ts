import { Erroptions, SimplyError } from '../Error/Error';

/**
 * Produce error messages just like Simply DJS
 * @param options

 */

export async function emitError(
	options: Erroptions = {
		tip: 'Join the Support Server [https://discord.gg/gRxk364D6Y]'
	}
) {
	throw new SimplyError(options);
}
