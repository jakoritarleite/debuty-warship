import { MessageEmbed } from 'discord.js';
import Google from 'googleapis';
import ytdl from 'ytdl-core';

const Server = new Map();

Server.set('connection', null);
Server.set('songs', []);
Server.set('songsInfo', new Map());
Server.set('playing', false);

async function join(message) {
    if (message.member.voice.channel && message.member.voice.channel.id === process.env.MUSIC_CHANNEL_ID) {
        message.react('👌');
        console.log(`Joining ${process.env.MUSIC_CHANNEL_ID} channel`);
        Server.set('connection', await message.member.voice.channel.join());
    } else {
        const Embed = new MessageEmbed()
            .setDescription("You need to join the **Music** channel before being able to use this command.")
            .setColor(0x636466)

        message.channel.send(Embed);
    }
}

async function play(message, args) {
    const music = !args.startsWith('https') ? await search(args) : args; 

    if (!Server.get('connection')) {
        await join(message, args);
    } else if (!args) {
        const Embed = new MessageEmbed()
            .setDescription(`There is no song in the queue to play! **${process.env.PREFIX}add** a song.`)
            .setColor(0x636466)
    
        message.channel.send(Embed);
    }
    
    else if (!Server.get('playing')) {
        const connection = Server.get('connection');
        
        await addQueue(message, music);

        connection.play(ytdl(Server.get('songs')[0], { filter: 'audioonly' }), { type: 'webm/opus' })
        .on('finish', () => {
            songsQueue.shift(); Server.set('songs', songsQueue);
            play(message, Server.get('songs')[0])
        })
        .on('error', Error => console.error('Error: ' + Error.message))

        Server.set('playing', true);

        const currentTitle = Server.get('songsInfo'); console.log('Playing ' + currentTitle.get(music).title);

        const Embed = new MessageEmbed()
            .setTitle('Now playing')
            .setThumbnail(currentTitle.get(music).thumbnail)
            .setDescription(`[${currentTitle.get(music).title}](${Server.get('songs')})`)
            .setFooter(`Added by ${currentTitle.get(music).askedBy}`)
            .setColor(0x636466)
    
        message.channel.send(Embed);

    } else if (Server.get('playing')) {
        await addQueue(message, music);

        const currentTitle = Server.get('songsInfo'); console.log('Queued ' + currentTitle.get(music).title);

        const Embed = new MessageEmbed()
            .setTitle('Queued song')
            .setThumbnail(currentTitle.get(music).thumbnail)
            .setDescription(`[${currentTitle.get(music).title}](${Server.get('songs')})`)
            .setFooter(`Added by ${currentTitle.get(music).askedBy}`)
            .setColor(0x636466)
    
        message.channel.send(Embed);
    }
}

// Internal functions

async function addQueue(message, music) {
    let songsQueue = Server.get('songs');
    songsQueue.push(music); Server.set('songs', songsQueue);

    const songInfo = await ytdl.getInfo(music);
    let songsInfo = Server.get('songsInfo');
    songsInfo.set(music, {'askedBy': message.member.displayName, 'title': songInfo.title, 'thumbnail': songInfo.player_response.videoDetails.thumbnail.thumbnails[songInfo.player_response.videoDetails.thumbnail.thumbnails.length - 1].url}); Server.set('songsInfo', songsInfo);
}

async function search(name) {
    const YouTube = new Google.youtube_v3.Youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_KEY
    });
}

export { join, play };