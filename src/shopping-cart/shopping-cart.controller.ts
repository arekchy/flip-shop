import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';

@Controller('shopping-cart')
export class ShoppingCartController {

  constructor(private readonly shoppingCartService: ShoppingCartService) {
  }

  @Post()
  create() {
    return this.shoppingCartService.create();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('action') action: ShoppingCartAction,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.shoppingCartService.update(id, action, productId, quantity);
  }

  @Get(':id')
  checkout(@Param('id') id: string, @Query('currency') currency: string) {
    return this.shoppingCartService.checkout(id, currency);
  }

}
