export class ProductDto {
  id: string;
  name: string;
  price: ProductPriceDto;
  quantity: number;
  description?: string;
}

export interface ProductPriceDto {
  value: number;
  currency: string;
}