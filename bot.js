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

	else if (command === 'avatar') {
		message.reply(message.author.displayAvatarURL());
	}

	else if (command === 'live') {
		const embed = new MessageEmbed()
			.setTitle("Wait, I'm being developed.")
			.setColor(0xff0000)
			.setDescription()
		message.channel.send(embed);

		//message.reply("Wait, I'm being developed.");
	}
});

client.login(process.env.BOT_TOKEN);
