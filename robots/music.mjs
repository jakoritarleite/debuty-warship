export async function join(message, args) {
    console.log('Joining channel');
}
export async function play(message, args) {
    message.react('👌');
    console.log('Playing music');
}