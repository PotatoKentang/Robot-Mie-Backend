import { orderQueue } from 'lib/order';
import { getServerResponse } from 'src/core/get-server-response';
import { processOrderBasedOnResponse } from 'src/core/process-order-based-on-response';

export const orderProcessWorker = async () => {
  console.log('processing order');
  //check if the order is idle or not
  const responseStatus = await getServerResponse();
  await processOrderBasedOnResponse(responseStatus);

  console.log(`
    ================================================
    ================ Order Queue ====================
    ================================================
    `);
  console.log(orderQueue.order.getAll());
  console.log(`
    ================================================
    ============ Working Order Queue ===============
    ================================================
    `);
  console.log(orderQueue.currentWorkingOrder.getAll());
};
