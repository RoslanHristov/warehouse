import { Query, Resolver } from '@nestjs/graphql';
import { CalculationsAPISerivce } from './calc.service';

@Resolver()
export class CalcResolver {
  constructor(private readonly calcAPI: CalculationsAPISerivce) {}

  @Query(() => String)
  async getCalc(): Promise<string> {
    const result = await this.calcAPI.getCalc();
    console.log(result);
    return result;
  }
}
