export async function ping(message, args) {
    message.reply('Pong :ping_pong:');
    console.log('Ping` to user');
}
export async function hello(message, args) {
    message.reply('Hi');
    console.log('Saying hi to user');
}