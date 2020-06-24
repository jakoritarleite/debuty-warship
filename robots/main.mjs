import { ping as _ping, pong as _pong, hello as _hello } from './util.mjs';
import { join as _join, play as _play } from './music.mjs';

const Commands = {
    ping: _ping,
    pong: _pong,
    hello: _hello,
    join: _join,
    play: _play
}

export async function main(message, command, args) {
    try {
        await Commands[command](message, args);
    }
    catch (Error) {
        if (Error.message === 'Commands[command] is not a function') return;
        console.log(Error.message);
    }
}