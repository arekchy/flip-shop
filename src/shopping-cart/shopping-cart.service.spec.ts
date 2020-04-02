import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsService } from '../products/products.service';
import { ProductDto } from '../products/interfaces/product.dto';
import { ShoppingCartAction } from './interfaces/shopping-cart.action';
import { ShoppingCartDto } from './interfaces/shopping-cart.dto';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  const productsService = {
    findByIds: (): any[] => { return; },
    findById: (): any => { return; },
  };
  const currenciesService = {
    convert: (): any => { return; },
  };

  const products = [
    new ProductDto({
      id: 'p1',
      name: 'Item X',
      quantity: 10,
      description: 'Very nice item X',
      price: {
        value: 15,
        currency: 'EUR',
      },
    }),
    new ProductDto({
      id: 'p2',
      name: 'Item Y',
      quantity: 4,
      description: 'Awsome item Y',
      price: {
        value: 4,
        currency: 'PLN',
      },
    }),
  ];

  beforeEach(async () => {
    jest.restoreAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: ProductsService,
          useValue: productsService,
        },
        {
          provide: CurrenciesService,
          useValue: currenciesService,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create new shopping cart', () => {
      expect(service.create()).toEqual(expect.any(String));
    });
  });

  describe('update', () => {

    it('When try to update not existing cart, should throw NotFoundException', () => {
      const cartId = 'not-existing-cart';

      const update1Input = {
        quantity: 1,
        productId: 'not-existing-product',
        action: ShoppingCartAction.ADD,
      };

      expect(() => {
        service.update(cartId, update1Input);
      })
        .toThrowError(new NotFoundException('Shopping cart not found'));
    });

    describe('adding products', () => {
      it('should add one product to cart', () => {
        const product1 = products[0];
        jest.spyOn(productsService, 'findById').mockReturnValueOnce(product1);

        const cartId = service.create();

        const result = service.update(cartId, {
          quantity: 1,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        });

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [{
          productId: product1.id,
          quantity: 1,
        }];

        expect(result).toEqual(expectedResult);
      });

      it('should add the same product to cart twice', () => {
        const product1 = products[0];
        jest.spyOn(productsService, 'findById').mockReturnValue(product1);

        const cartId = service.create();

        service.update(cartId, {
          quantity: 1,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        });

        const result = service.update(cartId, {
          quantity: 1,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        });

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [{
          productId: product1.id,
          quantity: 2,
        }];

        expect(result).toEqual(expectedResult);
      });

      it('should add 2 products to cart', () => {
        const product1 = products[0];
        const product2 = products[1];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValueOnce(product1)
          .mockReturnValueOnce(product2);

        const cartId = service.create();

        const update1Input = {
          quantity: 1,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };

        const update2Input = {
          quantity: 2,
          productId: product2.id,
          action: ShoppingCartAction.ADD,
        };

        service.update(cartId, update1Input);
        const result = service.update(cartId, update2Input);

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [
          {
            productId: update1Input.productId,
            quantity: update1Input.quantity,
          },
          {
            productId: update2Input.productId,
            quantity: update2Input.quantity,
          },
        ];

        expect(result).toEqual(expectedResult);
      });

      it('When adding not existing product, should throw UnprocessableEntityException', () => {
        const cartId = service.create();

        const update1Input = {
          quantity: 1,
          productId: 'not-existing-product',
          action: ShoppingCartAction.ADD,
        };

        expect(() => {
          service.update(cartId, update1Input);
        })
          .toThrowError(new UnprocessableEntityException('Product not found'));
      });

      it('When try to add more products than in warehouse, should throw UnprocessableEntityException', () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValueOnce(product1);

        const cartId = service.create();

        expect(() => {
          service.update(cartId, {
            quantity: product1.quantity + 1,
            productId: product1.id,
            action: ShoppingCartAction.ADD,
          });
        })
          .toThrowError(new UnprocessableEntityException('Insufficient product quantity in warehouse'));
      });

    });

    describe('Removing products', () => {

      it('When try to remove not existing product from shopping cart, should throw UnprocessableEntityException', () => {
        const cartId = service.create();

        const update1Input = {
          quantity: 1,
          productId: 'not-existing-product',
          action: ShoppingCartAction.REMOVE,
        };

        expect(() => {
          service.update(cartId, update1Input);
        })
          .toThrowError(new UnprocessableEntityException('Product not found'));
      });

      it('When try to decrease amount of products, should return cart with decreased number of selected products', () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValue(product1);

        const cartId = service.create();

        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };

        const update2Input = {
          quantity: 1,
          productId: product1.id,
          action: ShoppingCartAction.REMOVE,
        };

        service.update(cartId, update1Input);
        const result = service.update(cartId, update2Input);

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [
          {
            productId: product1.id,
            quantity: update1Input.quantity - update2Input.quantity,
          },
        ];
        expect(result).toEqual(expectedResult);
      });

      it('When try to decrease amount of selected product to 0, should return cart without this product', () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValue(product1);

        const cartId = service.create();

        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };

        const update2Input = {
          quantity: update1Input.quantity,
          productId: product1.id,
          action: ShoppingCartAction.REMOVE,
        };

        service.update(cartId, update1Input);
        const result = service.update(cartId, update2Input);

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [];
        expect(result).toEqual(expectedResult);
      });

      it('When try to decrease amount of selected product below 0, should return cart without this product', () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValue(product1);

        const cartId = service.create();

        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };

        const update2Input = {
          quantity: update1Input.quantity + 1,
          productId: product1.id,
          action: ShoppingCartAction.REMOVE,
        };

        service.update(cartId, update1Input);
        const result = service.update(cartId, update2Input);

        const expectedResult = new ShoppingCartDto();
        expectedResult.id = cartId;
        expectedResult.productsList = [];
        expect(result).toEqual(expectedResult);
      });

    });

    describe('checkout', () => {
      it('should return list of products with calculated price in selected currency (basic currency, without exchange)', async () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValue(product1);

        const requestedCurrency = 'EUR';
        const conversionValue = 15;
        jest
          .spyOn(currenciesService, 'convert')
          .mockReturnValue(conversionValue);

        const cartId = service.create();
        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };
        service.update(cartId, update1Input);

        const result = await service.checkout(cartId);
        expect(result).toEqual({
          shoppingCartId: expect.any(String),
          detailedProductsList: [
            {
              name: product1.name,
              quantity: update1Input.quantity,
              description: product1.description,
              originalPrice: {
                currency: product1.price.currency,
                value: product1.price.value,
                total: product1.price.value * update1Input.quantity,
              },
              requestedCurrencyPrice: {
                currency: requestedCurrency,
                value: product1.price.value,
                total: product1.price.value * update1Input.quantity,
              },
            }
          ],
          totalPrice: { value: conversionValue * update1Input.quantity, currency: requestedCurrency }
        });

        expect(currenciesService.convert).not.toBeCalled();
      });

      it('should return list of products with calculated price in selected currency', async () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValue(product1);

        const requestedCurrency = 'PLN';
        const conversionValue = 10;
        jest
          .spyOn(currenciesService, 'convert')
          .mockReturnValue(conversionValue);

        const cartId = service.create();
        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };
        service.update(cartId, update1Input);

        const result = await service.checkout(cartId, 'PLN');
        expect(result).toEqual({
          shoppingCartId: expect.any(String),
          detailedProductsList: [
            {
              name: product1.name,
              quantity: update1Input.quantity,
              description: product1.description,
              originalPrice: {
                currency: product1.price.currency,
                value: product1.price.value,
                total: product1.price.value * update1Input.quantity,
              },
              requestedCurrencyPrice: {
                currency: requestedCurrency,
                value: conversionValue,
                total: conversionValue * update1Input.quantity,
              },
            }
          ],
          totalPrice: { value: conversionValue * update1Input.quantity, currency: requestedCurrency }
        });

        expect(currenciesService.convert).toBeCalledTimes(1);
      });

      it('should return list of products with calculated price in selected currency', async () => {
        const product1 = products[0];
        const product2 = products[1];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValueOnce(product1)
          .mockReturnValueOnce(product2)
          .mockReturnValueOnce(product1)
          .mockReturnValueOnce(product2);

        const conversionValue = 10;
        jest
          .spyOn(currenciesService, 'convert')
          .mockReturnValue(conversionValue);

        const requestedCurrency = 'GBP';

        const cartId = service.create();
        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };
        service.update(cartId, update1Input);

        const update2Input = {
          quantity: 1,
          productId: product2.id,
          action: ShoppingCartAction.ADD,
        };
        service.update(cartId, update2Input);

        const result = await service.checkout(cartId, requestedCurrency);

        expect(result).toEqual({
          shoppingCartId: expect.any(String),
          detailedProductsList: [
            {
              name: product1.name,
              quantity: update1Input.quantity,
              description: product1.description,
              originalPrice: {
                currency: product1.price.currency,
                value: product1.price.value,
                total: product1.price.value * update1Input.quantity,
              },
              requestedCurrencyPrice: {
                currency: requestedCurrency,
                value: conversionValue,
                total: update1Input.quantity * conversionValue,
              },
            },
            {
              name: product2.name,
              quantity: update2Input.quantity,
              description: product2.description,
              originalPrice: {
                currency: product2.price.currency,
                value: product2.price.value,
                total: product2.price.value * update2Input.quantity,
              },
              requestedCurrencyPrice: {
                currency: requestedCurrency,
                value: conversionValue,
                total: conversionValue * update2Input.quantity,
              },
            }
          ],
          totalPrice: { value: conversionValue * (update2Input.quantity + update1Input.quantity), currency: requestedCurrency }
        });

        expect(currenciesService.convert).toBeCalledTimes(2);
      });

      it('When requested more products than available, should return UnprocessableEntityException', async () => {
        const product1 = products[0];
        jest
          .spyOn(productsService, 'findById')
          .mockReturnValueOnce(product1)
          .mockReturnValueOnce({
            ...product1,
            quantity: 0,
          });

        const requestedCurrency = 'PLN';
        const conversionValue = 10;
        jest
          .spyOn(currenciesService, 'convert')
          .mockReturnValue(conversionValue);

        const cartId = service.create();
        const update1Input = {
          quantity: 3,
          productId: product1.id,
          action: ShoppingCartAction.ADD,
        };
        service.update(cartId, update1Input);

        expect(service.checkout(cartId, 'PLN'))
          .rejects.toEqual(new UnprocessableEntityException(`Insufficient products quantity in warehouse: ${product1.name}`));

        expect(currenciesService.convert).toBeCalledTimes(1);
      });

    });

  });
});
