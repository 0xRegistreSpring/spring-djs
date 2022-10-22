import {
	MessageEmbed,
	Message,
	MessageButton,
	MessageActionRow,
	ColorResolvable,
	MessageEmbedAuthor,
	MessageEmbedFooter,
	MessageButtonStyle,
	TextChannel,
	Permissions
} from 'discord.js';
import { ExtendedInteraction, ExtendedMessage } from './interfaces';

import { SpringError } from './Error/Error';
import chalk from 'chalk';

// ------------------------------
// ------- T Y P I N G S --------
// ------------------------------

/**
 
 */

interface CustomizableEmbed {
	author?: MessageEmbedAuthor;
	title?: string;
	footer?: MessageEmbedFooter;
	description?: string;
	color?: ColorResolvable;

	credit?: boolean;
}

/**

 */

interface btnTemplate {
	style?: MessageButtonStyle;
	label?: string;
	emoji?: string;
}

export type tSysOptions = {
	embed?: CustomizableEmbed;
	button?: btnTemplate;
	channelId?: string;
};

// ------------------------------
// ------ F U N C T I O N -------
// ------------------------------

/**

 * @param message
 * @param options

 */

export async function ticketSystem(
	message: ExtendedMessage | ExtendedInteraction,
	options: tSysOptions = {}
) {
	try {
		const ch = options.channelId;

		if (!ch || ch == '')
			throw new SpringError({
				name: 'NOT_SPECIFIED | Provide an channel id to send memes.',
				tip: `Expected channelId as string in options.. | Received ${
					ch || 'undefined'
				}`
			});

		let channel = await message.client.channels.fetch(ch, {
			cache: true
		});

		channel = channel as TextChannel;

		if (!channel)
			throw new SpringError({
				name: `INVALID_CHID - ${options.channelId} | The channel id you specified is not valid (or) The bot has no VIEW_CHANNEL permission.`,
				tip: 'Check the permissions (or) Try using another Channel ID'
			});

		let interaction;
		if (message.commandId) {
			interaction = message;
		}
		const int = message as ExtendedInteraction;
		const mes = message as Message;

		if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			if (interaction) {
				return await int.followUp({
					content: 'You are not an admin to create a Ticket Panel',
					ephemeral: true
				});
			} else if (!interaction) {
				return await mes.reply({
					content: 'You are not an admin to create a Ticket Panel'
				});
			}
		}

		const ticketbtn = new MessageButton()
			.setStyle(options?.button?.style || 'PRIMARY')
			.setEmoji(options?.button?.emoji || '🎫')
			.setLabel(options?.button?.label || 'Open a Ticket')
			.setCustomId('create_ticket');

		if (!options.embed) {
			options.embed = {
				footer: {
					text: 'SpringBots V3'
				},
				color: '#075FFF',
				title: 'Create an Ticket',
				credit: true
			};
		}

		const a = new MessageActionRow().addComponents([ticketbtn]);

		const embed = new MessageEmbed()
			.setTitle(options.embed?.title || 'Ticket System')
			.setColor(options.embed?.color || '#075FFF')
			.setDescription(
				options.embed?.description ||
					'🎫 Create an ticket by interacting with the button 🎫'
			)
			.setThumbnail(message.guild.iconURL())
			.setTimestamp()
			.setFooter(
				options.embed?.credit === false
					? options.embed?.footer
					: {
							text: 'SpringBots V3'
					  }
			);

		if (interaction) {
			int.followUp('Done. Setting Ticket to that channel');
			channel.send({ embeds: [embed], components: [a] });
		} else if (!interaction) {
			channel.send({ embeds: [embed], components: [a] });
		}
	} catch (err: any) {
		console.log(
			`${chalk.red('Error Occured.')} | ${chalk.magenta(
				'ticketSystem'
			)} | Error: ${err.stack}`
		);
	}
}
