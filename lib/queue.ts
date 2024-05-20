class Queue<T> {
  queue: T[];
  constructor() {
    this.queue = [];
  }
  enqueue(item: T) {
    this.queue.push(item);
  }

  dequeue(): T | undefined {
    return this.queue.shift();
  }

  peek(): T | undefined {
    return this.queue[0];
  }

  size(): number {
    return this.queue.length;
  }
  isEmpty(): boolean {
    return this.queue.length === 0;
  }
  clear(): void {
    this.queue = [];
  }
  getAll(): T[] {
    return this.queue;
  }
  enqueueAll(items: T[]) {
    this.queue.push(...items);
  }
}

export default Queue;
