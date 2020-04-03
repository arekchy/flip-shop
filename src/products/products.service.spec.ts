import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductDto } from './interfaces/product.dto';
import { plainToClass } from 'class-transformer';

describe('ProductsService', () => {
  let service: ProductsService;

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
      providers: [
        ProductsService,
        {
          provide: 'PRODUCTS',
          useValue: products,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('When method called, should return array of products', async () => {
      expect(await service.findAll()).toEqual(products);
    });
  });

  describe('findByIds', () => {
    it('When method called with array of ids, should return array of selected products', async () => {
      const product1 = products[0];
      const product2 = products[1];

      expect(await service.findByIds([product1.id, product2.id])).toEqual([
        product1,
        product2,
      ]);
    });

    it('When method called with empty array as input, should return empty array', async () => {
      expect(await service.findByIds([])).toEqual([]);
    });

    it('When method called with not existing id, should return empty array', async () => {
      expect(await service.findByIds(['notExistingProductId'])).toEqual([]);
    });
  });

  describe('findById', () => {
    it('When method called with id, should return selected product', async () => {
      const product = products[1];

      expect(await service.findById(product.id)).toEqual(product);
    });
  });
});
