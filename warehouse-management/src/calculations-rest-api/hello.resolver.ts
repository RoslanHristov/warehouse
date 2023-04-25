import { Query, Resolver } from '@nestjs/graphql';
import { CalculationsAPISerivce } from './hello.service';

@Resolver()
export class HelloResolver {
  constructor(private readonly calcAPI: CalculationsAPISerivce) {}

  @Query(() => String)
  async createHello() {
    const result = await this.calcAPI.getHello();
    console.log(result);
    return result;
  }
}
