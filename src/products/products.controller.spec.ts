import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductDto } from './interfaces/product.dto';
import { plainToClass } from 'class-transformer';

describe('Products Controller', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  const products = [
    plainToClass(ProductDto, {
      id: 'p1',
      name: 'Item X',
      quantity: 10,
      description: 'Very nice item X',
      price: {
        value: 15,
        currency: 'EUR',
      },
    }),
    plainToClass(ProductDto, {
      id: 'p2',
      name: 'Item Y',
      quantity: 4,
      description: 'Awsome item Y',
      price: {
        value: 4,
        currency: 'PLN',
      },
    }),
    plainToClass(ProductDto, {
      id: 'p3',
      name: 'Item Z',
      quantity: 1,
      price: {
        value: 150,
        currency: 'EUR',
      },
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: 'PRODUCTS',
          useValue: products,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('When method called without params, should return array of all products', async () => {
      jest
        .spyOn(productsService, 'findAll')
        .mockImplementation(() => this.products);

      expect(await controller.findAll()).toBe(this.products);
      expect(productsService.findAll).toBeCalledTimes(1);
    });
  });
});
