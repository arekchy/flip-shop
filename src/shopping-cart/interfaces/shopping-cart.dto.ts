export class ShoppingCartDto {
  id: string;
  productsList: ShoppingCartProductListItem[];
}

export interface ShoppingCartProductListItem {
  productId: string;
  quantity: number;
}