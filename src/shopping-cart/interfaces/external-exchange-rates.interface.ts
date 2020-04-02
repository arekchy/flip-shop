export interface ExternalExchangeRates {
  rates: { [key: string]: number };
  base: string;
  date: string;
}