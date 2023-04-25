import { Controller, Get } from '@nestjs/common';

@Controller('calculation')
export class CalculationController {
  @Get()
  async hello() {
    return 'Get CALCULATIONs !!!';
  }
}
