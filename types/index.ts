export type Product = {
    id:number
    image:string
    name:string
    price:number
    address:string
    callback_address:string
    orderId:string
    count:number | 0 
}

export type ProductListFromDB = {
    id:number
    image:string
    name:string
    price:number
    address:string
    callback_address:string
    count:number | 0 
}

export enum RobotStatus {
  idle = 0,
  cooking = 1,
  error = 2
}

export type Finish = {
  batch:number,
  status:string,
  food:Product[]
}
