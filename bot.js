const Discord = require('discord.js');
const client = new Discord.Client();

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
});

client.login(process.env.BOT_TOKEN);
