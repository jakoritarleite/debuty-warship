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
				Execute(message, args, serverQueue);
			} else {
				await YouTube.search.list({ part: 'snippet', q: args }, function (err, response) {
					if (err) console.error('Error: ' + err);
				
					if (response) {
						for (let i = 0; i < response.data.items.length; i++) {
							if (response.data.items[i].id.videoId != undefined) {
								Execute(message, 'https://www.youtube.com/watch?v=' + response.data.items[i].id.videoId, serverQueue);
								break;
							}
						}
					}
				});
			}
		} else {
			message.reply('You need to join the music channel first!');
		}
	}
});

async function Execute(message, music, serverQueue) {
	const songInfo = await ytdl.getInfo(music);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url
	};

	const voiceChannel = message.member.voice.channel;
	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};

		queue.set(message.guild.id, queueContruct);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			Play(message.guild, queueContruct.songs[0]);
		} catch (error) {
			console.error(error);
			queue.delete(message.guild.id);
			
			return message.channel.send(error);
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(song.title + ' has been added to the queue!');
	}
}

function play(guild, music) {
	const serverQueue = queue.get(guild.id);
	
	if (!music) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
	
		return;
	}
  
	const dispatcher = serverQueue.connection
		.play(ytdl(music.url), { type: 'webm/opus' })
		.on("finish", () => {
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on("error", error => console.error(error));

	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}