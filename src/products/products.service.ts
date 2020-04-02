import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from './interfaces/product.dto';

/**
 * Service responsible for products resolving
 */
@Injectable()
export class ProductsService {
  /**
   * Constructor
   * @param products
   */
  constructor(@Inject('PRODUCTS') private readonly products: ProductDto[]) {}

  /**
   * Resolves all products form database
   * @returns {Promise<ProductDto[]>}
   */
  async findAll() {
    return Promise.resolve(this.products);
  }

  /**
   * Returns selected products from database
   * @param ids
   * @returns {ProductDto[]}
   */
  findByIds(ids: string[]) {
    return this.products.filter(product => ids.includes(product.id));
  }

  /**
   * Returns selected product from database
   * @param id
   * @returns {ProductDto}
   */
  findById(id: string) {
    return this.products.find(product => product.id === id);
  }
}
