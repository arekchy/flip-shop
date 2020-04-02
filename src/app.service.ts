import { Injectable } from '@nestjs/common';

/**
 * resolves main app routes
 */
@Injectable()
export class AppService {
  /**
   * Test function
   * @returns {string}
   */
  getHello(): string {
    return 'Hello World!';
  }
}
