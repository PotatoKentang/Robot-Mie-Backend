import { ID } from 'types';
import prismaClient from './prisma-client';

const getNewOrderIDFromDB = async (): Promise<number> => {
  const dateString = new Date().toLocaleDateString('en-US');
  const orderID = await prismaClient.orderDaily.findUnique({
    where: {
      date: dateString,
    },
  });
  if (orderID == null) {
    await prismaClient.orderDaily.create({
      data: {
        date: dateString,
      },
    });
    return 0;
  }
  await prismaClient.orderDaily.update({
    where: {
      date: dateString,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
  return orderID.count + 1;
};

export const getOrderID = async (): Promise<ID> => {
  // Get the current date
  const currentDate = new Date();
  const dateString = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

  // Increment the order ID
  const orderID = await getNewOrderIDFromDB();
  const zeroFilledOrderId = ('000' + orderID).slice(-3);
  // Combine the date prefix and order ID
  const uniqueID = `${dateString}-${zeroFilledOrderId}`;
  console.log(uniqueID);
  return { id: uniqueID };
};
