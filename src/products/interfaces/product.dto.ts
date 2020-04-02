/**
 * Represents product available in shop
 */
export class ProductDto {
  /**
   * product id
   */
  id: string;
  /**
   * product name
   */
  name: string;
  /**
   * product price - currency and value
   */
  price: ProductPriceDto;
  /**
   * product quantity available in warehouse
   */
  quantity: number;
  /**
   * optional product description
   */
  description?: string;

  /**
   * Takes plain object and converts to ProductDto
   * @param input
   */
  constructor(input: Pick<ProductDto, keyof ProductDto>) {
    Object.assign(this, input);
    Object.freeze(this.price);
    Object.freeze(this);
  }
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