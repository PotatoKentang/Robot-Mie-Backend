import { orderQueue } from 'lib/order';
import { sendCommandToRobot } from './send-command-to-robot';
import prismaClient from 'utils/prisma-client';

// 0 unavailable 1 available
let statusLifts = [0, 0, 0]; // status for each lift

export const servingFood = async () => {
  const lifts = [
    '80000200000000640000' + '01018200C8000001',
    // '80000200000000640000' + '01018200C8000002',
    // '80000200000000640000' + '01018200C8000003',
  ];

  for (let i = 0; i < lifts.length; i++) {
    const currentLiftStatus = await sendCommandToRobot(lifts[i]);

    if (currentLiftStatus === 0 && statusLifts[i] === 1) {
      const orderThatIsServed = orderQueue.currentWorkingOrder.dequeue();

      if (
        !orderThatIsServed ||
        !orderThatIsServed.orderId ||
        !orderThatIsServed.orderNumber ||
        !orderThatIsServed.orderVariantId
      )
        continue;

      console.log(
        `Serving ${orderThatIsServed.orderId} ${orderThatIsServed.orderNumber} ${orderThatIsServed.orderVariantId}`,
      );

      await prismaClient.order.updateMany({
        where: {
          orderId: orderThatIsServed.orderId,
          orderVariantId: orderThatIsServed.orderVariantId,
          orderNumber: orderThatIsServed.orderNumber,
        },
        data: {
          status: 'served',
          lift: i + 1,
        },
      });
    }

    statusLifts[i] = currentLiftStatus;
  }
};
