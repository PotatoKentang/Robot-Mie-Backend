// Define function to process messages
export const stringToByteArray = (message) => {
    const byteArray = [];
    for (let i = 0; i < message.length; i += 2) {
        byteArray.push(parseInt(message.substr(i, 2), 16));
    }
    return new Uint8Array(byteArray);
}