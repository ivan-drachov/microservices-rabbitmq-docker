import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateOrder(@Param('id') id: string, @Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.updateOrder(id, request, req.cookies?.Authentication);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(request, req.cookies?.Authentication);
  }

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('/:id')
  async getOrder(@Param('id') id: string){
    return this.ordersService.getOrder(id)
  }
}
