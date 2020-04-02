import { ProductPriceDto } from '../../products/interfaces/product.dto';

/**
 * Represents product price (value and currency) and total value (value multiplied by quantity)
 */
export interface ProductPriceWithTotal extends ProductPriceDto {
  /**
   * Represents products total value (value multiplied by quantity)
   */
  total: number;
}

/**
 * Represents shopping cart total value and currency
 */
export interface TotalPrice {
  /**
   * money value
   */
  value: number;
  /**
   * money currency
   */
  currency: string;
}

/**
 * Represents detailed product info for shopping cart checkout
 */
export interface DetailedProductListItem {
  /**
   * product name
   */
  name: string;
  /**
   * product price in original currency (as added to database)
   */
  originalPrice: ProductPriceWithTotal;
  /**
   * product price in requested by user currency
   */
  requestedCurrencyPrice: ProductPriceWithTotal;
  /**
   * product quantity added to shopping cart
   */
  quantity: number;
  /**
   * product description
   */
  description?: string;
}

/**
 * order checkout representation
 */
export interface OrderCheckoutDto {
  /**
   * related shopping cart id
   */
  shoppingCartId: string;
  /**
   * total price of shopping cart in requested currency
   */
  totalPrice: TotalPrice;
  /**
   * list of products added to shopping cart
   */
  detailedProductsList: DetailedProductListItem[];
}