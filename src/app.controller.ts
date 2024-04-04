import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Product, ProductListFromDB } from 'types';
import { Cron,CronExpression } from '@nestjs/schedule';
import { orderProcessWorker } from 'src/core/order-process-worker';
import { sendCommandToRobot } from './core/send-command-to-robot';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    orderProcessWorker();
  }
  @Get("/")
  getHello(): string {
    return "hello";
  }
  @Get("/send-command/:command")
  async sendCommand(@Param('command') command: string): Promise<number> {
     try {
          const response = await sendCommandToRobot(command);
          console.log('Response:', response);
          return response
      } catch (error) {
          return 2;
      }
  }

  @Post("/add-order")
  async addOrder(@Body() order: Product): Promise<Product> {
    try {
      const response = await this.appService.addOrder(order);
      console.log('Response:', response);
      return response
    } catch (error) {
      return null;
    }
  }

  @Get("/get-product-list")
  async getProduct(): Promise<ProductListFromDB[]> {
    try {
      const response = await this.appService.getProduct();
      console.log('Response:', response);
      return response
    } catch (error) {
      return null;
    }
  }
}
