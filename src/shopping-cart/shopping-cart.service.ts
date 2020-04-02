import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ShoppingCartDto,
  ShoppingCartProductListItem,
} from './interfaces/shopping-cart.dto';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ProductsService } from '../products/products.service';
import { ShoppingCartUpdateDto } from './interfaces/shopping-cart-update.dto';
import { ProductDto } from '../products/interfaces/product.dto';
import {
  DetailedProductListItem,
  OrderCheckoutDto,
  ProductPriceWithTotal,
  TotalPrice,
} from './interfaces/order-checkout.dto';
import { CurrenciesService } from './currencies.service';

/**
 * Used for manage shopping carts
 */
@Injectable()
export class ShoppingCartService {
  /**
   * Storage for shopping carts
   * @type {Map<string, ShoppingCartDto>}
   */
  private readonly carts = new Map<string, ShoppingCartDto>();

  /**
   * Constructor
   * @param productsService
   * @param currenciesService
   */
  constructor(
    private readonly productsService: ProductsService,
    private readonly currenciesService: CurrenciesService,
  ) {}

  /**
   * Create shopping cart
   * @returns {string}
   */
  create(): string {
    const newShoppingCart = new ShoppingCartDto();
    newShoppingCart.id = randomStringGenerator();
    newShoppingCart.productsList = [];

    this.carts.set(newShoppingCart.id, newShoppingCart);
    return newShoppingCart.id;
  }

  /**
   * Update shopping cart
   * @param {string} id
   * @param {ShoppingCartUpdateDto} shoppingCartUpdate
   * @returns {ShoppingCartDto}
   */
  update(id: string, shoppingCartUpdate: ShoppingCartUpdateDto) {
    const shoppingCart = this.assertShoppingCart(id);
    const product = this.assertProduct(shoppingCartUpdate.productId);
    let updatedProductsList: ShoppingCartProductListItem[];

    switch (shoppingCartUpdate.action) {
      case ShoppingCartAction.ADD:
        updatedProductsList = this.addProductsToList(
          shoppingCart.productsList,
          product,
          shoppingCartUpdate.quantity,
        );
        break;
      case ShoppingCartAction.REMOVE:
        updatedProductsList = this.removeProductsFromList(
          shoppingCart.productsList,
          shoppingCartUpdate.productId,
          shoppingCartUpdate.quantity,
        );
        break;
    }

    if (updatedProductsList) {
      this.updateCartList(shoppingCart, updatedProductsList);
    }

    return this.carts.get(id);
  }

  /**
   * Get summary of shopping cart
   * @param id
   * @param requestedCurrency
   * @returns {Promise<{detailedProductsList: DetailedProductListItem[]; totalPrice: TotalPrice; shoppingCartId: string}>}
   */
  async checkout(
    id: string,
    requestedCurrency = 'EUR',
  ): Promise<OrderCheckoutDto> {
    const shoppingCart = this.assertShoppingCart(id);
    const insufficientQuantityProducts = [];

    const detailedProductsList = await Promise.all(
      shoppingCart.productsList.map(async productListItem => {
        const product = this.assertProduct(productListItem.productId);

        if (product.quantity < productListItem.quantity) {
          insufficientQuantityProducts.push(product.name);
        }

        return this.buildDetailedProductItem(
          product,
          productListItem.quantity,
          requestedCurrency,
        );
      }),
    );

    if (insufficientQuantityProducts.length) {
      throw new UnprocessableEntityException(
        `Insufficient products quantity in warehouse: ${insufficientQuantityProducts.join()}`,
      );
    }

    const totalPrice: TotalPrice = {
      value: this.calculateTotalRequestedPrice(detailedProductsList),
      currency: requestedCurrency,
    };

    return {
      shoppingCartId: id,
      detailedProductsList,
      totalPrice,
    };
  }

  /**
   * Create detailed product info for order checkout
   * @param product
   * @param quantity
   * @param requestedCurrency
   * @returns {Promise<{quantity: number; originalPrice: ProductPriceWithTotal; name: string; description: string; requestedCurrencyPrice: ProductPriceWithTotal}>}
   */
  private async buildDetailedProductItem(
    product: ProductDto,
    quantity: number,
    requestedCurrency: string,
  ): Promise<DetailedProductListItem> {
    let requestedCurrencyPrice: ProductPriceWithTotal;
    const originalPrice: ProductPriceWithTotal = {
      ...product.price,
      total: quantity * product.price.value,
    };

    if (requestedCurrency !== product.price.currency) {
      const singleItemPrice = await this.currenciesService.convert(
        product.price.currency,
        requestedCurrency,
        product.price.value,
      );
      requestedCurrencyPrice = {
        currency: requestedCurrency,
        value: singleItemPrice,
        total: quantity * singleItemPrice,
      };
    } else {
      requestedCurrencyPrice = { ...originalPrice };
    }

    return {
      name: product.name,
      quantity,
      description: product.description,
      originalPrice,
      requestedCurrencyPrice,
    };
  }

  /**
   * Update shopping cart products list
   * @param cart
   * @param productsList
   */
  private updateCartList(
    cart: ShoppingCartDto,
    productsList: ShoppingCartProductListItem[],
  ) {
    this.carts.set(cart.id, {
      ...cart,
      productsList,
    });
  }

  /**
   * Assert shopping car
   * @param id
   * @returns {ShoppingCartDto}
   */
  private assertShoppingCart(id: string): ShoppingCartDto {
    const shoppingCart = this.carts.get(id);
    if (!shoppingCart) {
      throw new NotFoundException('Shopping cart not found');
    }
    return shoppingCart;
  }

  /**
   * Assert product
   * @param productId
   * @returns {ProductDto}
   */
  private assertProduct(productId: string): ProductDto {
    const product = this.productsService.findById(productId);
    if (!product) {
      throw new UnprocessableEntityException('Product not found');
    }
    return product;
  }

  /**
   * Add products to shopping cart list
   * @param productsList
   * @param product
   * @param quantityToAdd
   * @returns {ShoppingCartProductListItem[]}
   */
  private addProductsToList(
    productsList: ShoppingCartProductListItem[],
    product: ProductDto,
    quantityToAdd: number,
  ) {
    const updatedProductsList = [...productsList];
    const productIndex = updatedProductsList.findIndex(
      productListItem => productListItem.productId === product.id,
    );
    let combinedQuantity: number;
    if (productIndex !== -1) {
      combinedQuantity =
        updatedProductsList[productIndex].quantity + quantityToAdd;
      updatedProductsList[productIndex].quantity = combinedQuantity;
    } else {
      combinedQuantity = quantityToAdd;
      updatedProductsList.push({
        productId: product.id,
        quantity: combinedQuantity,
      });
    }

    if (product.quantity < combinedQuantity) {
      throw new UnprocessableEntityException(
        'Insufficient product quantity in warehouse',
      );
    }

    return updatedProductsList;
  }

  /**
   * Remove products from shopping cart list
   * @param productsList
   * @param productId
   * @param quantity
   * @returns {ShoppingCartProductListItem[]}
   */
  private removeProductsFromList(
    productsList: ShoppingCartProductListItem[],
    productId: string,
    quantity: number,
  ) {
    return productsList.reduce(
      (
        newList: ShoppingCartProductListItem[],
        productListItem: ShoppingCartProductListItem,
      ) => {
        if (productListItem.productId === productId) {
          productListItem.quantity =
            productListItem.quantity > quantity
              ? productListItem.quantity - quantity
              : 0;
          if (productListItem.quantity > 0) {
            return newList.concat(productListItem);
          }
        }
        return newList;
      },
      [],
    );
  }

  /**
   * Calculate total products price
   * @param detailedProductsList
   * @returns {number}
   */
  private calculateTotalRequestedPrice(
    detailedProductsList: DetailedProductListItem[],
  ): number {
    return detailedProductsList.reduce((sum, item) => {
      return sum + item.requestedCurrencyPrice.total;
    }, 0);
  }
}
