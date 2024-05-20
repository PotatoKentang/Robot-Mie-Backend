import { Injectable } from '@nestjs/common';
import { orderQueue } from 'lib/order';
import {
  BE_CheckSouce,
  BE_Message,
  Product,
  ProductListFromDB,
  SauceProps,
} from 'types';
import prismaClient from 'utils/prisma-client';
import { sendCommandToRobot } from './core/send-command-to-robot';
import { INITIAL_SAUCE_QUANTITY } from 'constant';
@Injectable()
export class AppService {
  getStatusLift = async (): Promise<number> => {
    const LIFT1 = '80000200000000640000' + '01018200C8000001';
    // const LIFT2 = '';
    const currentLift1Status = await sendCommandToRobot(LIFT1);
    return currentLift1Status;
  };
  counterOfTheDay = 1;
  addOrder = async (order: Product): Promise<void> => {
    //id adalah variant dari product
    //orderId adalah id unique untuk setiap order
    await prismaClient.product.updateMany({
      where: {
        id: order.orderVariantId,
      },
      data: {
        count: {
          decrement: 1,
        },
      },
    });
    //flaw logic kalo quantity-nya 1
    const orderNumber = this.counterOfTheDay++;
    await prismaClient.order.create({
      data: {
        orderVariantId: order.orderVariantId,
        orderId: order.orderId,
        orderNumber: orderNumber,
        name: order.name,
        price: order.price,
        quantity: 1,
      },
    });
    const newProductObj: Product = {
      ...order,
      orderNumber,
    };
    orderQueue.order.enqueue(newProductObj);
  };
  getProduct = async (): Promise<ProductListFromDB[]> => {
    return await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        callback_address: true,
        address: true,
        count: true,
      },
    });
  };

  resetDailySauce = async (): Promise<void> => {
    const date = new Date().toLocaleDateString('en-US');
    //check if daily sauce exist
    const dailySauceExist = await prismaClient.sauce.findMany({
      where: {
        date: date,
      },
    });
    if (dailySauceExist.length !== 0) return;
    //create daily sauce
    await prismaClient.sauce.create({
      data: {
        name: 'Mie Korea',
        date: date,
        quantity: INITIAL_SAUCE_QUANTITY,
      },
    });
    await prismaClient.sauce.create({
      data: {
        name: 'Mie Korea Pedas',
        date: date,
        quantity: INITIAL_SAUCE_QUANTITY,
      },
    });
    await prismaClient.sauce.create({
      data: {
        name: 'Mie Korea Original',
        date: date,
        quantity: INITIAL_SAUCE_QUANTITY,
      },
    });
    //create daily sauce end
  };

  addSauceQuantity = async (sauce: SauceProps): Promise<void> => {
    //check if sauce exist
    const sauceExist = await prismaClient.sauce.findFirst({
      where: {
        date: sauce.date,
        name: sauce.name,
      },
    });
    //create sauce if not exist
    if (!sauceExist) {
      await prismaClient.sauce.create({
        data: {
          name: sauce.name,
          date: sauce.date,
          quantity: INITIAL_SAUCE_QUANTITY + sauce.quantity,
        },
      });
      return;
    }
    //update sauce quantity
    await prismaClient.sauce.updateMany({
      where: {
        date: sauce.date,
      },
      data: {
        name: sauce.name,
        quantity: {
          increment: sauce.quantity,
        },
      },
    });
  };
  getSauceQuantity = async (sauce: BE_CheckSouce): Promise<BE_Message> => {
    const date = new Date(sauce.date).toLocaleDateString('en-US');

    // Find the product by productId
    const product = await prismaClient.product.findUnique({
      where: {
        id: sauce.productId,
      },
      include: {
        sauce: true, // Include the related sauce
      },
    });

    if (!product) {
      return {
        message: 'Product not found',
        status: 404,
      };
    }

    // Get the sauce name from the product
    const sauceName = product.sauce.name;

    // Find the sauce by name and date
    const sauceExist = await prismaClient.sauce.findFirst({
      where: {
        date: date,
        name: sauceName,
      },
    });

    // Check if the sauce exists
    if (!sauceExist) {
      return {
        message: 'Sauce not found for the given date',
        status: 404,
      };
    }

    // Check if the available quantity is less than the requested quantity
    if (sauceExist.quantity < sauce.quantity) {
      return {
        message: 'Sauce not enough',
        status: 400,
      };
    }

    return {
      message: 'Sauce available',
      status: 200,
    };
  };
}
