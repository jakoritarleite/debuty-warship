const { Message } = require("discord.js")

module.exports = {
    ping: async function (message, args) {
        message.reply('Pong :ping_pong:');
        console.log('Ping` to user');
    },
    hello: async function (message, args) {
        message.reply('Hi');
        console.log('Saying hi to user');
    }
}