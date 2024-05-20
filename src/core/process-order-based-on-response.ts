import { RobotStatus } from 'types';
import { orderQueue } from 'lib/order';
import { sendCommandToRobot } from './send-command-to-robot';
import prismaClient from 'utils/prisma-client';
const HEADER_REQUEST = '80000200000000640000';
const START_PROCESS: string = '010231006402000101';

const MAX_PROCESS_PER_BATCH = 3;
const TIME_DELAY_BETWEEN_CHECK = 500;
const CHECK_TO_CONFIRM_IDLE = 3;
let count = 0;
export const processOrderBasedOnResponse = async (response: RobotStatus) => {
  switch (response) {
    case RobotStatus.idle:
      console.log('idle');
      //jika sudah kembali ke idle, maka simpan hasil masak sebelumnya dan selesaikan batch
      if (
        orderQueue.currentWorkingOrder.getWorkingOrder() != null &&
        count > CHECK_TO_CONFIRM_IDLE
      ) {
        console.log(
          'RobotStatus.idle then save the previous cooking and finish the batch',
        );
        //simpen order yang sudah selesai disini
        const order = orderQueue.currentWorkingOrder.getWorkingOrder();
        for (const key in order) {
          if (!order.hasOwnProperty(key)) continue;
          const products = order[key];
          console.log(key, products);
          for (const process of products) {
            await prismaClient.order.updateMany({
              where: {
                orderId: process.orderId,
                orderVariantId: process.orderVariantId,
                orderNumber: process.orderNumber,
              },
              data: {
                status: 'cooking',
              },
            });
          }
        }
        count = 0;
        return;
      }
      count++;
      //order masih ada namun currentWorkingOrder kosong
      if (
        !orderQueue.order.isEmpty() &&
        orderQueue.currentWorkingOrder.getWorkingOrder()
      ) {
        const order = await orderQueue.getOrderToProcess(MAX_PROCESS_PER_BATCH);
        //ini gk jalan karena orderNumber pasti berbeda cuman sama dia di groupin
        console.log('Here is the order: ', order);
        for (const key in order) {
          if (!order.hasOwnProperty(key)) continue;
          const products = order[key];
          for (const process of products) {
            await prismaClient.order.updateMany({
              where: {
                orderId: process.orderId,
                orderVariantId: process.orderVariantId,
                orderNumber: process.orderNumber,
              },
              data: {
                status: 'cooking',
              },
            });
          }
          console.log('Hit before');
          //kita ambil first aja karena mereka sama aja attributenya hanya beda di count
          const process = products[0];
          if(process.count === 0){
            console.log('count 0');
            continue;
          }
          const productCount = products.length;
          let initialCount = productCount;
          const foodAddress = HEADER_REQUEST + process.address + productCount;
          const foodCallbackAddress = HEADER_REQUEST + process.callback_address;
          try {
            const foodData = await sendCommandToRobot(foodAddress);
            console.log('===============================================');
            console.log('food data: ', foodData, ' address: ', foodAddress);
            console.log('===============================================');
            const foodCountCallback =
              await sendCommandToRobot(foodCallbackAddress);
            await new Promise((resolve) => {
              setTimeout(() => {
                resolve(1);
              }, 3000);
            });
            initialCount -= foodCountCallback;
            while (initialCount > 0) {
              try {
                await new Promise<number>((resolve) => {
                  setTimeout(async () => {
                    const foodCountCallback =
                      await sendCommandToRobot(foodCallbackAddress);
                    initialCount -= foodCountCallback;
                    resolve(1);
                  }, TIME_DELAY_BETWEEN_CHECK); // Simulate server response delay
                });
              } catch (error) {
                console.log('food callback error', error);
                // If the callback fails, continue sending the order
                break;
              }
            }
          } catch (error) {
            console.log('food error', error);
          }
        }

        console.log('Hit after');
        const startProcess = HEADER_REQUEST + START_PROCESS;
        //start process
        try {
          const startProcessData = await sendCommandToRobot(startProcess);
          console.log(
            'start process data',
            startProcessData,
            ' address: ',
            startProcess,
          );
        } catch (error) {
          console.log('start process error', error);
        }
      }
      console.log('RobotStatus.idle');
      break;

    case RobotStatus.cooking:
      //check cooking yang sedang dilakukan dan bila error kita masukin ke db
      //tembak tembakin buat cek status dan kalo yang ditembak error maka kita simpan ke db
      console.log('RobotStatus.cooking');
      break;

    case RobotStatus.error:
      // menyimpan state ke local storage bahwa batch yang dijalankan sedang error saat dimasak
      //menyimpan ke order kalo orderan ini error
      console.log('RobotStatus.error');
      break;
  }
};
