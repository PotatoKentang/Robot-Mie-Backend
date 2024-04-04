import { Injectable } from '@nestjs/common';
import dgram from "dgram";
import { orderQueue } from 'lib/order';
import { Product, ProductListFromDB } from 'types';
import prismaClient from 'utils/prisma-client';
import { stringToByteArray } from 'utils/string-to-byte-array';

@Injectable()
export class AppService {
  sendAndReceive = (command:string) : Promise<number> => {
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
        client.send(byteArray, parseInt(process.env.REMOTE_PORT, 10), process.env.REMOTE_HOST, (error) => {
            if (error) {
                console.log(error);
                reject(error);
                client.close(); // Close the client socket in case of an error
            }
        });
    });
  };
  addOrder = async(order: Product): Promise<Product> => {
      //decrease the order count in product
      const [product] = await prismaClient.$transaction([
        prismaClient.product.updateMany({
            where: {
                id: order.id
            },
            data: {
                count: {
                    decrement: 1
                }
            }
        })
      ])
      return new Promise((resolve, reject) => {
          orderQueue.order.enqueue(order)
          resolve(order);
      });
  };
  getProduct = async(): Promise<ProductListFromDB[]> => {
        return await prismaClient.product.findMany({
            select:{
                id:true,
                name:true,
                price:true,
                image:true,
                callback_address:true,
                address:true,
                count:true,
            }
        });
  }
}
