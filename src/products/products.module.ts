import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductDto } from './interfaces/product.dto';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: 'PRODUCTS',
      useValue: [
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
        new ProductDto({
          id: 'p3',
          name: 'Item Z',
          quantity: 1,
          price: {
            value: 150,
            currency: 'EUR',
          },
        }),
      ],
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
