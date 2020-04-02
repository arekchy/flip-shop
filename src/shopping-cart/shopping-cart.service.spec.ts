import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsService } from '../products/products.service';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        ProductsService,
        {
          provide: 'PRODUCTS',
          useValue: [],
        }
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
