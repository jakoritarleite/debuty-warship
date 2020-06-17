const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => { console.log('I am ready!') });
client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
});

client.login('-YIQN0r6s7W3UFoLM-XC2Boa3SCf65Q0');
