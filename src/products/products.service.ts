import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from './interfaces/product.dto';

@Injectable()
export class ProductsService {

  constructor(@Inject('PRODUCTS') private readonly products: ProductDto[]) {
  }

  async findAll() {
    return Promise.resolve(this.products);
  }

  findByIds(ids: string[]) {
    return this.products
      .filter(
        product => ids.includes(product.id),
      );
  }

  findById(id: string) {
    return this.products.find(product => product.id === id);
  }
}
