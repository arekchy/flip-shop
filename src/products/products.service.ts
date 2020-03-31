import { Injectable } from '@nestjs/common';
import { ProductDto } from './interfaces/product.dto';

@Injectable()
export class ProductsService {
  private readonly products: ProductDto[] = [];

  findAll() {
    return [];
  }

  findByIds() {
    return;
  }
}
