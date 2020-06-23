const { Message } = require("discord.js")

module.exports = {
    ping: async function (Message) {
        Message.reply('Pong :ping_pong:');
    }
}