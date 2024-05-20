import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  BE_CheckSouce,
  BE_Message,
  ID,
  Product,
  ProductListFromDB,
  SauceProps,
} from 'types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { orderProcessWorker } from 'src/core/order-process-worker';
import { sendCommandToRobot } from './core/send-command-to-robot';
import { servingFood } from './core/serving-food';
import { getOrderID } from 'utils/daily-counter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return 'hello';
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailySauce() {
    await this.appService.resetDailySauce();
  }

  @Post('/add-sauce-quantity')
  async addSauceQuantity(@Body() sauce: SauceProps) {
    await this.appService.addSauceQuantity(sauce);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async checkForServedFood() {
    await servingFood();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  processingOrder() {
    orderProcessWorker();
  }

  @Get('/send-command/:command')
  async sendCommand(@Param('command') command: string): Promise<number> {
    try {
      const response = await sendCommandToRobot(command);
      console.log('Response:', response);
      return response;
    } catch (error) {
      return 2;
    }
  }

  @Post('/add-order')
  async addOrder(@Body() order: Product): Promise<void> {
    try {
      await this.appService.addOrder(order);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/get-product-list')
  async getProduct(): Promise<ProductListFromDB[]> {
    try {
      const response = await this.appService.getProduct();
      return response;
    } catch (error) {
      return null;
    }
  }

  @Get('/get-order-id')
  async getOrderId(): Promise<ID> {
    return await getOrderID();
  }

  @Post('/check-sauce-availability')
  async getSauceQuantity(@Body() sauce: BE_CheckSouce): Promise<BE_Message> {
    return await this.appService.getSauceQuantity(sauce);
  }
}
