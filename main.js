const Util = require('./robots/util');
const Music = require('./robots/music');

const Commands = {
    ping: Util.ping,
    join: Music.join,
    play: Music.play
}

module.exports = {
    main: async function (message, command, args) {
        args ? Commands[command](message, args) : Commands[command](message);
    }
}