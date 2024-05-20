import { Product, WorkingOrderProps } from 'types';
import Queue from 'lib/queue';
import { WorkingOrder } from './working-order';

class Order {
  order: Queue<Product>;
  currentWorkingOrder: WorkingOrder;

  constructor() {
    this.order = new Queue<Product>();
    this.currentWorkingOrder = new WorkingOrder();
  }

  groupOrders(orders: Product[]): WorkingOrderProps {
    const groupedOrders: WorkingOrderProps = {};

    for (const order of orders) {
      const key = `${order.orderVariantId}-${order.orderId}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = [];
      }
      groupedOrders[key].push(order);
    }
    return groupedOrders;
  }

  async getOrderToProcess(
    MAX_PROCESS_PER_BATCH: number,
  ): Promise<WorkingOrderProps> {
    const orders: Product[] = [];
    for (let index = 0; index < MAX_PROCESS_PER_BATCH; index++) {
      const order = this.order.dequeue();
      if (order) {
        orders.push(order);
      }
    }
    const processedOrders: WorkingOrderProps = this.groupOrders(orders);
    return this.currentWorkingOrder.enqueueAll(processedOrders);
  }

    // async getOrderToProcessOld(MAX_PROCESS_PER_BATCH: number): Promise<Product[]> {
    //     const orders: Product[] = [];

    //     for (let index = 0; index < MAX_PROCESS_PER_BATCH; index++) {
    //         const order = this.order.dequeue();
    //         if (order) {
    //             orders.push(order);
    //         }
    //     }
    //     const processedOrders: Product[] = await this.groupOrders(orders)
    //     for(const order of processedOrders){
    //         this.currentWorkingOrder.enqueue(order);
    //     }
    //     return this.currentWorkingOrder.getAll();
    // }

    // getOrderToProcessOldOld(MAX_PROCESS_PER_BATCH) {
    //   for (let index = 0; index < MAX_PROCESS_PER_BATCH; index++) {
    //     const order = this.order.dequeue();
    //     this.currentWorkingOrder.enqueue(order);
    //   }
    //   return this.currentWorkingOrder.getAll();
    // }
}

export const orderQueue = new Order();
