import { Product } from "types";
import Queue from "lib/queue";

class Order {
    order: Queue<Product>;
    currentWorkingOrder: Queue<Product>;

    constructor() {
        this.order = new Queue<Product>();
        this.currentWorkingOrder = new Queue<Product>();
    }

    groupOrders(orders: Product[]): Product[] {
        const groupedOrders: { [key: string]: Product } = {};

        for (const order of orders) {
            const key = `${order.id}-${order.orderId}}`;
            if (!groupedOrders[key]) {
                groupedOrders[key] = { ...order, count: 0 };
            }
            groupedOrders[key].count += order.count;
        }

        return Object.values(groupedOrders);
    }

    async getOrderToProcess(MAX_PROCESS_PER_BATCH: number): Promise<Product[]> {
        const orders: Product[] = [];

        for (let index = 0; index < MAX_PROCESS_PER_BATCH; index++) {
            const order = this.order.dequeue();
            if (order) {
                orders.push(order);
            }
        }
        const processedOrders: Product[] = await this.groupOrders(orders)
        for(const order of processedOrders){
            this.currentWorkingOrder.enqueue(order);
        }
        return this.currentWorkingOrder.getAll();
    }

    getOrderToProcessOld(MAX_PROCESS_PER_BATCH){
        for (let index = 0; index < MAX_PROCESS_PER_BATCH; index++) {
            const order = this.order.dequeue();
            this.currentWorkingOrder.enqueue(order);
        }
        return this.currentWorkingOrder.getAll();
    }
}

export const orderQueue = new Order();