import { Product, WorkingOrderProps } from 'types';

export class WorkingOrder {
  data: WorkingOrderProps;

  constructor() {
    this.data = {};
  }
  getWorkingOrder() {
    return this.data;
  }

  enqueue(orderId: string, newProducts: Product[]) {
    if (!this.data[orderId]) {
      this.data[orderId] = [];
    }
    this.data[orderId].push(...newProducts);
  }

  enqueueAll(data: WorkingOrderProps) {
    this.data = data;
    return this.data
  }

  dequeue(): Product | undefined {
    for (const orderId in this.data) {
      if (this.data[orderId].length > 0) {
        const product = this.data[orderId].shift();
        if (this.data[orderId].length === 0) {
          delete this.data[orderId];
        }
        return product;
      }
    }
    return undefined;
  }

  peek(): Product | undefined {
    for (const orderId in this.data) {
      if (this.data[orderId].length > 0) {
        return this.data[orderId][0];
      }
    }
    return undefined;
  }

  size(): number {
    let totalSize = 0;
    for (const orderId in this.data) {
      totalSize += this.data[orderId].length;
    }
    return totalSize;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.data = {};
  }

  getAll(): Product[] {
    const allProducts: Product[] = [];
    for (const orderId in this.data) {
      allProducts.push(...this.data[orderId]);
    }
    return allProducts;
  }
}
