'use strict';

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => { console.log('I am ready!') });
client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || !message.guild) return;
	const command = message.content.split(' ')[0].substr(process.env.PREFIX.length);
	const args = message.content.split(' ').slice(1).join(' ');

	if (command === 'ping') {
		message.reply('pong :ping_pong:');
	}

	else if (command === 'hello') {
		message.reply('Hi ?');
	}

	else if (command === 'avatar') {
		message.reply(message.author.displayAvatarURL());
	}

	else if (command === 'live') {
		const embed = new MessageEmbed()
			.setTitle("Wait, I'm being developed.")
			.setColor(0xff0000)
		message.channel.send(embed);
	}
});

client.login(process.env.BOT_TOKEN);
