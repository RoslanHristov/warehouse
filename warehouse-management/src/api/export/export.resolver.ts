import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { ExportService } from './export.service';
import { CreateExportInput } from 'src/types/graphql';
import { ExportEntity } from 'src/libs/entities/export.entity';

@Resolver('Export')
export class ExportResolver {
  constructor(private readonly exportService: ExportService) {}

  @Mutation('createExport')
  public async createExport(
    @Args('CreateExportInput') createExportInput: CreateExportInput,
  ): Promise<ExportEntity> {
    return this.exportService.createExport(createExportInput);
  }

  @Mutation('updateExport')
  public async updateExport(
    @Args('id') id: string,
    @Args('UpdateExportInput') updateExportInput,
  ): Promise<ExportEntity> {
    return this.exportService.updateExport(id, updateExportInput);
  }

  @Mutation('deleteExport')
  public async deleteExport(@Args('id') id: string): Promise<string> {
    return this.exportService.deleteExport(id);
  }

  @Mutation('executeExport')
  public async executeExport(@Args('id') id: string): Promise<string> {
    return this.exportService.executeExport(id);
  }

  @Query()
  public async getExports(): Promise<ExportEntity[]> {
    return this.exportService.getExports();
  }

  @Query()
  public async getExport(@Args('id') id: string): Promise<ExportEntity> {
    return this.exportService.getExport(id);
  }

  @Query()
  public async getExportsByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<ExportEntity[]> {
    return this.exportService.getExportsByDate(startDate, endDate);
  }
}
