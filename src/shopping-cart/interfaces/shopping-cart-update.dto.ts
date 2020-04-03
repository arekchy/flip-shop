import { ShoppingCartAction } from './shopping-cart.action';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * data transfer object for shopping cart update
 */
export class ShoppingCartUpdateDto {
  /**
   * defines if products should be added or removed from cart
   */
  @IsEnum(ShoppingCartAction)
  action: ShoppingCartAction;

  /**
   * represents selected product
   */
  @IsString()
  productId: string;

  /**
   * product add/remove quantity change
   * Auto transform to number if possible
   */
  @Transform(quantity => +quantity)
  @IsInt()
  @Min(1)
  quantity: number;
}
