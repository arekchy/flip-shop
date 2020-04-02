import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService } from './currencies.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  const httpServiceMock = {
    get: (): any => {
      return;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CurrenciesService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
        {
          provide: 'EXCHANGE_RATES_API_URL',
          useValue: '',
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convert', () => {

    const exRatePLN = 4.5815;
    const exRateGBP = 0.8846;
    const exRateEUR = 1;
    const apiResponse = { 'rates': { 'PLN': exRatePLN, 'GBP': exRateGBP }, 'base': 'EUR', 'date': '2020-04-01' };
    const axiosResponse: AxiosResponse<any> = {
      data: apiResponse,
      status: 200,
      config: {},
      headers: {},
      statusText: 'OK',
    };

    it('should convert from EUR (BASE_RATE) to PLN', async () => {
      jest.spyOn(httpServiceMock, 'get').mockReturnValueOnce(of(axiosResponse));
      const result = await service.convert('EUR', 'PLN', 1);

      expect(result).toBe(exRatePLN / exRateEUR);
    });

    it('should convert from PLN to EUR (BASE_RATE)', async () => {
      jest.spyOn(httpServiceMock, 'get').mockReturnValueOnce(of(axiosResponse));
      const result = await service.convert('PLN', 'EUR', 1);

      expect(result).toBe(exRateEUR / exRatePLN);
    });

    it('should convert from GBP to PLN', async () => {
      jest.spyOn(httpServiceMock, 'get').mockReturnValueOnce(of(axiosResponse));
      const result = await service.convert('GBP', 'PLN', 1);

      expect(result).toBe(exRatePLN / exRateGBP);
    });

    it('should convert from PLN to GBP', async () => {
      jest.spyOn(httpServiceMock, 'get').mockReturnValueOnce(of(axiosResponse));
      const result = await service.convert('PLN', 'GBP', 1);

      expect(result).toBe(exRateGBP / exRatePLN);
    });

    it('should convert from 15 PLN to GBP', async () => {
      jest.spyOn(httpServiceMock, 'get').mockReturnValueOnce(of(axiosResponse));
      const result = await service.convert('PLN', 'GBP', 15);

      expect(result).toBe((exRateGBP / exRatePLN) * 15);
    });

  });
});
