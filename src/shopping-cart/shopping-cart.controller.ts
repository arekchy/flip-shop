import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartUpdateDto } from './interfaces/shopping-cart-update.dto';

/**
 * Controller responsible for /shopping-cart route
 */
@Controller('shopping-cart')
export class ShoppingCartController {
  /**
   * Constructor
   * @param shoppingCartService
   */
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  /**
   * Creates shopping cart
   * @returns {string}
   */
  @Post()
  create() {
    return this.shoppingCartService.create();
  }

  /**
   * Allow to add and remove products from shopping cart
   * @param id
   * @param shoppingCartUpdate
   * @returns {ShoppingCartDto}
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() shoppingCartUpdate: ShoppingCartUpdateDto,
  ) {
    return this.shoppingCartService.update(id, shoppingCartUpdate);
  }

  /**
   * Allow to checkout selected shopping cart with optional requested currency, default EUR
   * @param id
   * @param currency
   * @returns {Promise<OrderCheckoutDto>}
   */
  @Get(':id')
  checkout(@Param('id') id: string, @Query('currency') currency: string) {
    return this.shoppingCartService.checkout(id, currency);
  }
}
