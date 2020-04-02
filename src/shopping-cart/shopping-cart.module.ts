import { HttpModule, HttpService, Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsModule } from '../products/products.module';
import { CurrenciesService } from './currencies.service';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';
import axios from 'axios';

@Module({
  imports: [ProductsModule, HttpModule],
  controllers: [ShoppingCartController],
  providers: [
    ShoppingCartService,
    CurrenciesService,
    HttpService,
    {
      provide: 'EXCHANGE_RATES_API_URL',
      useValue: 'https://api.exchangeratesapi.io/latest',
    },
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios,
    },
  ],
})
export class ShoppingCartModule {
}
