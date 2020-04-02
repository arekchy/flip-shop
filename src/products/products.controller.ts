import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

/**
 * Controller responsible for /products route
 */
@Controller('products')
export class ProductsController {

  /**
   * Constructor
   * @param productsService
   */
  constructor(private productsService: ProductsService) {
  }

  /**
   * Returns all available products
   * @returns {Promise<ProductDto[]>}
   */
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

}
