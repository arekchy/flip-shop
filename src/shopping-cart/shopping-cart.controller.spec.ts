import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsService } from '../products/products.service';
import { ShoppingCartDto } from './interfaces/shopping-cart.dto';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';
import { OrderCheckoutDto } from './interfaces/order-checkout.dto';

describe('ShoppingCart Controller', () => {
  let controller: ShoppingCartController;
  const productsService = {};
  const shoppingCartService = {
    create: (): string => {
      return;
    },
    update: (): ShoppingCartDto => {
      return;
    },
    checkout: (): OrderCheckoutDto => {
      return;
    },
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [
        {
          provide: ShoppingCartService,
          useValue: shoppingCartService,
        },
        {
          provide: ProductsService,
          useValue: productsService,
        },
      ],
    }).compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return cart id', () => {
      const cartId = 'cartId';
      jest.spyOn(shoppingCartService, 'create').mockReturnValueOnce(cartId);

      expect(controller.create()).toBe(cartId);
    });
  });

  describe('update', () => {
    it('should return shopping cart', () => {
      const cartId = 'cartId';
      const shoppingCart = new ShoppingCartDto();
      jest
        .spyOn(shoppingCartService, 'update')
        .mockReturnValueOnce(shoppingCart);

      expect(
        controller.update(cartId, {
          action: ShoppingCartAction.REMOVE,
          productId: 'pid',
          quantity: 10,
        }),
      ).toBe(shoppingCart);
    });
  });

  describe('checkout', () => {
    it('should return order checkout', () => {
      const cartId = 'cartId';
      const orderCheckout = {} as OrderCheckoutDto;
      jest
        .spyOn(shoppingCartService, 'checkout')
        .mockReturnValueOnce(orderCheckout);

      expect(controller.checkout(cartId, 'EUR')).toBe(orderCheckout);
    });
  });
});
