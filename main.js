const Util = require('./robots/util');
const Music = require('./robots/music');

const Commands = {
    ping: Util.ping,
    hello: Util.hello,
    join: Music.join,
    play: Music.play
}

module.exports = {
    main: async function (message, command, args) {
        args ? await Commands[command](message, args) : await Commands[command](message);
    }
}