'use strict';

const { Client, Message } = require('discord.js');
const Client = new Client();

const Robot = {
    main: require('./main.js');
}

Client.on('ready', () => { console.log('I am ready!') });

Client.on('message', async message => {
    const Command = message.content.split(' ')[0].substr(process.env.PREFIX.length);
    const Arguments = message.content.split(' ').slice(1).join(' ');

    Robot.main(Command, Arguments);
});