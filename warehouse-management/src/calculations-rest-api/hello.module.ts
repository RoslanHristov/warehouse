import { Module } from '@nestjs/common';
import { HelloResolver } from './hello.resolver';
import { CalculationsAPISerivce } from './hello.service';

@Module({
  providers: [HelloResolver, CalculationsAPISerivce],
})
export class HelloModule {}
