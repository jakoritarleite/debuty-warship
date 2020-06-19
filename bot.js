'use strict';

const { Client, MessageEmbed } = require('discord.js');
const client = new Client();

client.on('ready', () => { console.log('I am ready!') });
client.on('message', async message => {
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
			.setColor(0x636466)
		message.channel.send(embed);
	}

	else if (command === 'play') {
		if (!message.guild) return;

		if (message.member.voice.channel && message.member.voice.channel.id == '720457254578683945') {
			const connection = await message.member.voice.channel.join();

			console.log(message);
		} else {
			message.reply('You need to join the music channel first!');
		}
	}

});

client.login(process.env.BOT_TOKEN);
