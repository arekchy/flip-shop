import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartUpdateDto } from './interfaces/shopping-cart-update.dto';

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
    @Body() shoppingCartUpdate: ShoppingCartUpdateDto,
  ) {
    return this.shoppingCartService.update(id, shoppingCartUpdate);
  }

  @Get(':id')
  checkout(@Param('id') id: string, @Query('currency') currency: string) {
    return this.shoppingCartService.checkout(id, currency);
  }

}
