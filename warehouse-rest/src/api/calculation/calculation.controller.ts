import { Controller, Get } from '@nestjs/common';
import { CalculationService } from './calculation.service';

@Controller('calculation')
export class CalculationController {
  constructor(private calcService: CalculationService) {}

  @Get()
  async getCalculation() {
    return this.calcService.getCalculation();
  }
}
