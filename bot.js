const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => { console.log('I am ready!') });
client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || !msg.guild) return;
	const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
	const args = msg.content.split(' ').slice(1).join(' ');

	if (command === 'ping') {
		message.reply('pong :ping_pong:');
	}

	else if (command === 'hello') {
		message.reply('Hi ?');
	}
});

client.login(process.env.BOT_TOKEN);
