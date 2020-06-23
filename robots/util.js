const { Message } = require("discord.js")

module.exports = {
    ping: async function (message) {
        message.reply('Pong :ping_pong:');
    },
    hello: async function (message) {
        message.reply('Hi');
    }
}