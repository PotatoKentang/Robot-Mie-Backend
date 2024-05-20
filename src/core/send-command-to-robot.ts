const dgram = require('dgram');
import { stringToByteArray } from 'utils/string-to-byte-array';
const LOCAL_PORT = 9600;
const REMOTE_PORT = 9600;
const REMOTE_HOST = '192.168.250.50';
const LOCAL_IP = '192.168.250.30';
export const sendCommandToRobot = (command: string): Promise<number> => {
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
      console.log('error', err);
      reject(err); // Reject promise in case of an error
      client.close(); // Close the client socket in case of an error
    });

    // Convert the command string to a byte array
    const byteArray = stringToByteArray(command);

    // Initialize the local IP endpoint
    const localEndpoint = {
      address: LOCAL_IP,
      port: LOCAL_PORT,
    };

    // Bind the client to the local endpoint
    // client.bind(localEndpoint);

    // Function to send command
    const sendCommand = () => {
      // Send the command to the remote host
      client.send(byteArray, REMOTE_PORT, REMOTE_HOST, (error) => {
        if (error) {
          console.log(error);
          reject(error); // Reject promise in case of an error
          client.close(); // Close the client socket in case of an error
        }
      });
    };

    // Attempt to send the command
    sendCommand();
  });
};
