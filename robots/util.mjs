export async function ping(message, args) {
    message.reply('Pong :ping_pong:');
    console.log('Pinging to user');
}

export async function pong(message, args) { 
    message.reply('Ping');
    message.react('🏓');
    console.log('Ponging to user');
}

export async function hello(message, args) {
    message.reply('Hi ?');
    console.log('Saying hi to user');
}