import { Injectable } from '@nestjs/common';
import { ShoppingCartDto } from './interfaces/shopping-cart.dto';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';

@Injectable()
export class ShoppingCartService {

  private carts: ShoppingCartDto[] = [];

  create(): string {
    return '';
  }

  update(
    id: string,
    action: ShoppingCartAction,
    productId: string,
    quantity: number,
  )  {
    return;
  }

  checkout(
    id: string,
    currency: string,
  ) {
    return;
  }

}
