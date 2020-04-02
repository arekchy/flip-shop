import {
  HttpService,
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExternalExchangeRates } from './interfaces/external-exchange-rates.interface';

@Injectable()
export class CurrenciesService {

  private exchageRatesLastSync: Date;
  private baseCurrency: string;
  private exchangeRatesCache = new Map<string, number>();

  private readonly ONE_HOUR = 60 * 60 * 1000;

  constructor(
    private readonly httpService: HttpService,
    @Inject('EXCHANGE_RATES_API_URL') private readonly exchangeRatesApiUrl: string,
  ) {
  }

  async convert(from: string, to: string, value: number) {
    const exchangeRates = await this.getExchangeRates();
    const fromRate = exchangeRates.get(from);
    const toRate = exchangeRates.get(to);

    if (!fromRate || !toRate) {
      throw new UnprocessableEntityException('Not supported currency');
    }

    return value * (toRate / fromRate);
  }

  private async getExchangeRates() {
    if (!this.exchageRatesLastSync || (Date.now() - this.exchageRatesLastSync.getTime()) > this.ONE_HOUR) {
      return this.getCurrentRates();
    }
    return this.exchangeRatesCache;
  }

  private async getCurrentRates() {
    const externalExchangeRates = await this.httpService.get<ExternalExchangeRates>(this.exchangeRatesApiUrl).toPromise();

    if (externalExchangeRates.status !== 200) {
      throw new ServiceUnavailableException();
    }

    this.baseCurrency = externalExchangeRates.data.base;
    this.exchageRatesLastSync = new Date();

    const currencyNames = Object.keys(externalExchangeRates.data.rates);
    this.exchangeRatesCache = currencyNames.reduce((currenciesMap, currencyName) => {
      currenciesMap.set(currencyName, externalExchangeRates.data.rates[currencyName]);
      return currenciesMap;
    }, new Map<string, number>([[this.baseCurrency, 1]]));

    return this.exchangeRatesCache;
  }

}
