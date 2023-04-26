import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculationModule } from './api/calculation/calculation.module';

@Module({
  imports: [CalculationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
