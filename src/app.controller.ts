import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * Main app controller, base route
 */
@Controller()
export class AppController {
  /**
   * AppController
   * @param appService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Test function
   * @returns {string}
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
