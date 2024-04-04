const dgram = require("dgram");
import { stringToByteArray } from "utils/string-to-byte-array";
export const sendCommandToRobot = (command:string) :Promise<number> =>{
    return new Promise((resolve, reject) => {
            // Create a new UDP client socket
            const client = dgram.createSocket('udp4');

            // Handle incoming messages
            client.on('message', (message) => {
                const statusArray = new Uint8Array(message);
                resolve(statusArray[statusArray.length - 1]);
                client.close(); // Close the client socket after receiving the response
            });

            // Handle errors
            client.on('error', (err) => {
                console.log("error", err)
                reject(err);
                client.close(); // Close the client socket in case of an error
            });

            // Convert the command string to a byte array
            const byteArray = stringToByteArray(command);

            // Initialize the local IP endpoint
            const localEndpoint = {
                address: process.env.LOCAL_IP,
                port: parseInt(process.env.LOCAL_PORT,10)
            };

            // Bind the client to the local endpoint
            client.bind(localEndpoint);

            // Send the command to the remote host
            client.send(byteArray, parseInt(process.env.REMOTE_PORT,10), process.env.REMOTE_HOST, (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                    client.close(); // Close the client socket in case of an error
                }
            });
    });
}