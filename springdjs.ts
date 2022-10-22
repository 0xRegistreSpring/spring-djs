// ------------------------------
// -------- E R R O R S ---------
// ------------------------------

import { SpringError } from './src/Error/Error';

if (+process.version.slice(1, 3) - 0 < 16)
	throw new SpringError({
		name: `NodeJS Version 16 or newer is required, but you are using ${process.version}.`,
		tip: `Install nodejs 16 or higher in https://nodejs.org/`
	});

try {
	require('discord.js');
} catch (e) {
	throw new SpringError({
		name: 'Discord.JS is required for this package to run',
		tip: 'This package is optimized to run with discord.js'
	});
}

const { version: discordJSVersion } = require(require('path').join(
	require.resolve('discord.js'),
	'..',
	'..',
	'package.json'
));

if (Number(discordJSVersion.slice(0, 2)) < 13)
	throw new SpringError({
		name: `Discord.JS version 13 or higher is required, but you are using ${discordJSVersion}. See https://www.npmjs.com/package/discord.js`,
		tip: 'This package is not optimized for Discord.JS v12 or lower.'
	});

// ------------------------------
// ------- E X P O R T S --------
// ------------------------------

export const version: string = '3.0.2';

export { toRgb } from './src/Others/toRgb';
export { emitError } from './src/Others/emitError';
export { ms } from './src/Others/ms';

export { automeme } from './src/automeme';
export { betterBtnRole } from './src/betterBtnRole';
export { btnRole } from './src/btnrole';
export { bumpSystem } from './src/bumpSys';
export { calculator } from './src/calc';
export { connect } from './src/connect';
export { clickBtn } from './src/clickBtn';

export { embedCreate } from './src/embed';
export { embedPages } from './src/embedPages';
export { ghostPing } from './src/ghostPing';
export { giveawaySystem } from './src/giveaway';
export { manageBtn } from './src/manageBtn';

export { menuPages } from './src/menuPages';

export { starboard } from './src/starboard';

export { ticketSystem } from './src/ticketSystem';

