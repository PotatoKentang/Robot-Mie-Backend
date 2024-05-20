export type Product = {
  orderVariantId: string; //product id
  orderId: string; //our order id (date-orderline)
  image: string;
  name: string;
  price: number;
  address: string;
  callback_address: string;
  orderNumber?: number;
  count: number | 0;
};

export type SauceProps = { name: string; date: string; quantity: number };

export type BE_CheckSouce = { productId:string; date: string; quantity: number };

export type WorkingOrderProps = { [key: string]: Product[] };

export type BE_Message = { message: string, status: number };

export type ProductListFromDB = {
  id: string;
  image: string;
  name: string;
  price: number;
  address: string;
  callback_address: string;
  count: number | 0;
};

export enum RobotStatus {
  idle = 0,
  cooking = 1,
  error = 2,
}

export type Finish = {
  batch: number;
  status: string;
  food: Product[];
};

export type ID = {
  id: string;
};
