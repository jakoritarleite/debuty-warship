'use strict';

const Google = require('googleapis');
const ytdl = require('ytdl-core');
const { Client, MessageEmbed } = require('discord.js');

const client = new Client();
client.login(process.env.BOT_TOKEN);

const YouTube = new Google.youtube_v3.Youtube({
	version: 'v3',
	auth: process.env.YOUTUBE_KEY
});

const queue = new Map();

client.on('ready', () => { console.log('I am ready!') });
client.on('message', async message => {
	if (!message.content.startsWith(process.env.PREFIX) || !message.guild) return;
	
	const command = message.content.split(' ')[0].substr(process.env.PREFIX.length);
	const args = message.content.split(' ').slice(1).join(' ');

	const serverQueue = queue.get(message.guild.id);

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
			if (args.startsWith('http')) {
				Play(args, serverQueue);
			} else {
				let music = '';
				await YouTube.search.list({ part: 'snippet', q: args }, function (err, response) {
					if (err) console.error('Error: ' + err);
				
					if (response) {
						console.log(response.data.items)
						for (let i = 0; i < response.data.items.length; i++) {
							if (response.data.items[i].id.videoId != undefined) {
								music = 'https://www.youtube.com/watch?v=' + response.data.items.id.videoId;
								break;
							}
						}
					}
				});
				Play(music, serverQueue);
			}
		} else {
			message.reply('You need to join the music channel first!');
		}
	}
});

async function Play(song, serverQueue) {
	console.log('song: ' + song);
	songInfo = await ytdl.getInfo(song);
	console.log(songInfo);

}