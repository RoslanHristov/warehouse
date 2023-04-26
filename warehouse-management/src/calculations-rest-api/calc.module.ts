import { Module } from '@nestjs/common';
import { CalcResolver } from './calc.resolver';
import { CalculationsAPISerivce } from './calc.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
    }),
  ],
  providers: [CalcResolver, CalculationsAPISerivce],
})
export class CalcModule {}
