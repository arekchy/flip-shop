import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ShoppingCartDto, ShoppingCartProductListItem } from './interfaces/shopping-cart.dto';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ProductsService } from '../products/products.service';
import { ShoppingCartUpdateDto } from './interfaces/shopping-cart-update.dto';
import { ProductDto } from '../products/interfaces/product.dto';

@Injectable()
export class ShoppingCartService {

  private readonly carts = new Map<string, ShoppingCartDto>();

  constructor(private readonly productsService: ProductsService) {
  }

  create(): string {
    const newShoppingCart = new ShoppingCartDto();
    newShoppingCart.id = randomStringGenerator();
    newShoppingCart.productsList = [];

    this.carts.set(newShoppingCart.id, newShoppingCart);
    return newShoppingCart.id;
  }

  update(
    id: string,
    shoppingCartUpdate: ShoppingCartUpdateDto,
  ) {

    const shoppingCart = this.assertShoppingCart(id);
    const product = this.assertProduct(shoppingCartUpdate.productId);

    switch (shoppingCartUpdate.action) {
      case ShoppingCartAction.ADD:
        this.addProductsToList(shoppingCart.productsList, product, shoppingCartUpdate.quantity);
        break;
      case ShoppingCartAction.REMOVE:
        this.removeProductsFromList(shoppingCart.productsList, shoppingCartUpdate.productId, shoppingCartUpdate.quantity);
        break;

    }

    return this.productsService.findById(id);
  }

  checkout(
    id: string,
    currency: string,
  ) {
    return;
  }

  private assertShoppingCart(id: string): ShoppingCartDto {
    const shoppingCart = this.carts.get(id);
    if (!shoppingCart) {
      throw new NotFoundException('Shopping cart not found');
    }
    return shoppingCart;
  }

  private assertProduct(productId: string): ProductDto {
    const product = this.productsService.findById(productId);
    if (!product) {
      throw new UnprocessableEntityException('Product not found');
    }
    return product;
  }

  private addProductsToList(productsList: ShoppingCartProductListItem[], product: ProductDto, quantity: number) {
    const updatedProductsList = productsList
      .map(productListItem => {
        if (productListItem.productId === product.id) {

          if (product.quantity < (quantity + productListItem.quantity)) {
            throw new UnprocessableEntityException('Insufficient product quantity in warehouse');
          }

          productListItem.quantity = quantity + productListItem.quantity;
        }
        return productListItem;
      });

    return updatedProductsList;
  }

  private removeProductsFromList(productsList: ShoppingCartProductListItem[], productId: string, quantity: number) {
    const updatedProductsList = productsList
      .reduce((newList: ShoppingCartProductListItem[], productListItem: ShoppingCartProductListItem) => {
        if (productListItem.productId === productId) {
          productListItem.quantity = productListItem.quantity > quantity ? productListItem.quantity - quantity : 0;
          if (productListItem.quantity > 0) {
            return newList.concat(productListItem);
          }
        }
        return newList;
      }, []);

    return updatedProductsList;
  }

}
