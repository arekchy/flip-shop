import { ShoppingCartAction } from './shopping-cart.action';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ShoppingCartUpdateDto {

  @IsEnum(ShoppingCartAction)
  action: ShoppingCartAction;

  @IsString()
  productId: string;

  @Transform(quantity => +quantity)
  @IsNumber()
  quantity: number;

}