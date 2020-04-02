import {
  HttpService,
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ExternalExchangeRates } from './interfaces/external-exchange-rates.interface';

/**
 * Responsible for fetches current exchange rates and converting currencies
 */
@Injectable()
export class CurrenciesService {

  /**
   * Date of last exchange rates update
   */
  private exchageRatesLastSync: Date;
  /**
   * Base currency for exchange calculations
   */
  private baseCurrency: string;
  /**
   * Current exchange rates storage
   * @type {Map<string, number>}
   */
  private exchangeRatesCache = new Map<string, number>();

  /**
   * Helper - 1 hour in milliseconds
   * @type {number}
   */
  private readonly ONE_HOUR = 60 * 60 * 1000;

  /**
   * Constructor
   * @param httpService
   * @param exchangeRatesApiUrl
   */
  constructor(
    private readonly httpService: HttpService,
    @Inject('EXCHANGE_RATES_API_URL') private readonly exchangeRatesApiUrl: string,
  ) {
  }

  /**
   * Converts given value from one currency to another
   * @param from
   * @param to
   * @param value
   * @returns {Promise<number>}
   */
  async convert(from: string, to: string, value: number) {
    const exchangeRates = await this.getExchangeRates();
    const fromRate = exchangeRates.get(from);
    const toRate = exchangeRates.get(to);

    if (!fromRate || !toRate) {
      throw new UnprocessableEntityException('Not supported currency');
    }

    return value * (toRate / fromRate);
  }

  /**
   * Resolves exchange rates using cache if data is fresh (one hour)
   * @returns {Promise<Map<string, number>>}
   */
  private async getExchangeRates() {
    if (!this.exchageRatesLastSync || (Date.now() - this.exchageRatesLastSync.getTime()) > this.ONE_HOUR) {
      return this.getCurrentRates();
    }
    return this.exchangeRatesCache;
  }

  /**
   * Fetches current exchange rates from external source
   * @returns {Promise<Map<string, number>>}
   */
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
