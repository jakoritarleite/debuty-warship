const { Client, Message } = require('discord.js');
const DClient = new Client();
const Main = require('./robots/main.mjs');

DClient.on('ready', () => { console.log('I am ready!') });

DClient.on('message', async message => {
    const Command = message.content.split(' ')[0].substr(process.env.PREFIX.length);
    const Arguments = message.content.split(' ').slice(1).join(' ');

    Command ? await Main.main(message, Command, Arguments) : null;
});

DClient.login(process.env.BOT_TOKEN);