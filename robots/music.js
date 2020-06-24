export async function join(message, args) {
    console.log('Joining channel');
}
export async function play(message, args) {
    message.react(':thumbsup:');
    console.log('Playing music');
}