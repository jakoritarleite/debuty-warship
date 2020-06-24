import { ping as _ping, hello as _hello } from './util.mjs';
import { join as _join, play as _play } from './music.mjs';

const Commands = {
    ping: _ping,
    hello: _hello,
    join: _join,
    play: _play
}

export async function main(message, command, args) {
    try {
        await Commands[command](message, args);
    }
    catch (Error) {
        console.log(Error.message);
    }
}