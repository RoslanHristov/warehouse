import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './libs/database.module';
import { CalculationModule } from './api/calculation/calculation.module';

@Module({
  imports: [DatabaseModule, CalculationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
