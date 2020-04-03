import { IsInt, IsString, Min } from 'class-validator';
/**
 * Represents product available in shop
 */
export class ProductDto {
  /**
   * product id
   */
  @IsString()
  id: string;
  /**
   * product name
   */
  @IsString()
  name: string;
  /**
   * product price - currency and value
   */
  price: ProductPriceDto;
  /**
   * product quantity available in warehouse
   */
  @IsInt()
  @Min(0)
  quantity: number;
  /**
   * optional product description
   */
  @IsString()
  description?: string;
}

/**
 * Represents product price (value and currency)
 */
export interface ProductPriceDto {
  /**
   * Product value
   */
  value: number;
  /**
   * Determinates in what currency product is stored in database
   */
  currency: string;
}
