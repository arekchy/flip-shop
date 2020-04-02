import { ProductPriceDto } from '../../products/interfaces/product.dto';

export interface ProductPriceWithTotal extends ProductPriceDto {
  total: number;
}

export interface TotalPrice {
  value: number;
  currency: string;
}

export interface DetailedProductListItem {
  name: string;
  originalPrice: ProductPriceWithTotal;
  requestedCurrencyPrice: ProductPriceWithTotal;
  quantity: number;
  description?: string;
}

export interface OrderCheckoutDto {
  shoppingCartId: string;
  totalPrice: TotalPrice;
  detailedProductsList: DetailedProductListItem[];
}