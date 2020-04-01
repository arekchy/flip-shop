export class ProductDto {
  id: string;
  name: string;
  price: ProductPriceDto;
  quantity: number;
  description?: string;

  constructor(input: Pick<ProductDto, keyof ProductDto>) {
    Object.assign(this, input);
    Object.freeze(this.price);
    Object.freeze(this);
  }
}

export interface ProductPriceDto {
  value: number;
  currency: string;
}