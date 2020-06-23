const { Message } = require("discord.js")

module.exports = {
    ping: async function (message, args) {
        message.reply('Pong :ping_pong:');
    },
    hello: async function (message, args) {
        message.reply('Hi');
    }
}