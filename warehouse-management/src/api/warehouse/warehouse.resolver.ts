import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseInput, UpdateWarehouseInput } from 'src/types/graphql';
import { WarehouseEntity } from 'src/libs/entities/warehouse.entity';

@Resolver('Warehouse')
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Mutation('createWarehouse')
  public async createWarehouse(
    @Args('CreateWarehouseInput') createWarehouseInput: CreateWarehouseInput,
  ): Promise<WarehouseEntity> {
    return this.warehouseService.createWarehouse(createWarehouseInput);
  }

  @Mutation('updateWarehouse')
  public async updateWarehouse(
    @Args('id') id: string,
    @Args('UpdateWarehouseInput') updateWarehouseInput: UpdateWarehouseInput,
  ): Promise<WarehouseEntity> {
    return await this.warehouseService.updateWarehouse(
      id,
      updateWarehouseInput,
    );
  }

  @Mutation('deleteWarehouse')
  public async remove(@Args('id') id: string): Promise<string> {
    return await this.warehouseService.deleteWarehouse(id);
  }

  @Mutation('freeUpWarehouseSpace')
  public async freeUpWarehouseSpace(@Args('id') id: string): Promise<string> {
    return await this.warehouseService.freeUpWarehouseSpace(id);
  }

  @Query()
  public async findAllWarehouses(): Promise<WarehouseEntity[]> {
    return await this.warehouseService.findAllWarehouses();
  }

  @Query()
  public async findWarehouseById(
    @Args('id') id: string,
  ): Promise<WarehouseEntity> {
    return await this.warehouseService.findWarehouseById(id);
  }

  @Query()
  public async getWarehouseStockCurrentCapacity(
    @Args('id') id: string,
  ): Promise<number> {
    return await this.warehouseService.getWarehouseStockCurrentCapacity(id);
  }

  @Query()
  public async getAllWarehousesCurrentCapacity(): Promise<number> {
    return await this.warehouseService.getAllWarehousesCurrentCapacity();
  }
}
