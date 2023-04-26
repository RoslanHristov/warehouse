import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ImportService } from './import.service';
import { CreateImportInput } from 'src/types/graphql';
import { ImportEntity } from 'src/libs/entities/import.entity';

@Resolver('Import')
export class ImportResolver {
  constructor(private readonly importService: ImportService) {}

  @Mutation('createImport')
  public async createImport(
    @Args('CreateImportInput') createImportInput: CreateImportInput,
  ): Promise<ImportEntity> {
    return this.importService.createImport(createImportInput);
  }

  @Mutation('updateImport')
  public async updateImport(
    @Args('id') id: string,
    @Args('UpdateImportInput') updateImportInput,
  ): Promise<ImportEntity> {
    return this.importService.updateImport(id, updateImportInput);
  }

  @Mutation('deleteImport')
  public async deleteImport(@Args('id') id: string): Promise<string> {
    return this.importService.deleteImport(id);
  }

  @Mutation('executeImport')
  public async executeImport(@Args('id') id: string) {
    return this.importService.executeImport(id);
  }

  @Query()
  public async getImports(): Promise<ImportEntity[]> {
    return this.importService.getImports();
  }

  @Query()
  public async getImport(@Args('id') id: string): Promise<ImportEntity> {
    return this.importService.getImport(id);
  }

  @Query()
  public async getImportsByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<ImportEntity[]> {
    return this.importService.getImportsByDate(startDate, endDate);
  }
}
