/**
 * External source data structure for exchange rates
 */
export interface ExternalExchangeRates {
  /**
   * map of pairs currency - value in reference to base currency
   */
  rates: { [key: string]: number };
  /**
   * Base currency, required for exchange calculations
   */
  base: string;
  /**
   * Date of exchange rates update
   */
  date: string;
}