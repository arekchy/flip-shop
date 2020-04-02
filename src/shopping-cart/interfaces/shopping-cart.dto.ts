/**
 * represents shopping cart
 */
export class ShoppingCartDto {
  /**
   * shopping cart id
   */
  id: string;
  /**
   * products added to shopping cart
   */
  productsList: ShoppingCartProductListItem[];
}

/**
 * representation of product and quantity in shopping cart
 */
export interface ShoppingCartProductListItem {
  /**
   * product id
   */
  productId: string;
  /**
   * product quantity in shopping cart
   */
  quantity: number;
}
