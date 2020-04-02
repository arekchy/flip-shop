import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsService } from '../products/products.service';

describe('ShoppingCart Controller', () => {
  let controller: ShoppingCartController;
  const productsService = {

  };
  const shoppingCartService = {

  };

  beforeEach(async () => {
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
      ]
    }).compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
