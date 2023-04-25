import { Module } from '@nestjs/common';
import { CalculationController } from './calculation.controller';

@Module({
  controllers: [CalculationController],
})
export class CalculationModule {}
