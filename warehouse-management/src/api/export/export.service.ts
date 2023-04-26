import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportEntity } from 'src/libs/entities/export.entity';
import { ProductEntity } from 'src/libs/entities/product.entity';
import { WarehouseEntity } from 'src/libs/entities/warehouse.entity';
import { CreateExportInput } from 'src/types/graphql';
import { Between, Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { WarehouseService } from '../warehouse/warehouse.service';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(ExportEntity)
    private readonly exportRepository: Repository<ExportEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(WarehouseEntity)
    private readonly warehouseRepository: Repository<WarehouseEntity>,
    private readonly warehouseService: WarehouseService,
    private readonly productService: ProductService,
  ) {}

  public async createExport(
    createExportInput: CreateExportInput,
  ): Promise<ExportEntity> {
    const { productId, exportToWarehouseId } = createExportInput;

    // Check if product exists
    const product: ProductEntity = await this.productService.findProductById(
      productId,
    );

    // Check if product warehouse exists
    const exportFromWarehouse: WarehouseEntity =
      await this.warehouseService.findWarehouseById(product.warehouseId);

    // Check if warehouse that we're exporting to exists
    const exportToWarehouse: WarehouseEntity =
      await this.warehouseService.findWarehouseById(exportToWarehouseId);

    if (product.warehouseId === exportToWarehouseId) {
      throw new ConflictException(
        `Export from same warehouse "${exportFromWarehouse.name}" to warehouse "${exportToWarehouse.name}" is not allowed`,
      );
    }

    // Check if exportToWarehouse has enough space
    if (
      exportToWarehouse.stockCurrentCapacity + product.productSize >
      exportToWarehouse.stockMaxCapacity
    ) {
      throw new ConflictException(
        `Warehouse "${exportToWarehouse.name}" does not have enough space for this product`,
      );
    }

    // Check if exported product is hazordous and warehouse will accept it
    if (product.isHazardous !== exportToWarehouse.hazardous) {
      throw new ConflictException(
        `Export to warehouse "${exportToWarehouse.name}" accepts only ${
          exportToWarehouse.hazardous ? 'hazardous' : 'non-hazardous'
        } products`,
      );
    }

    const newExport = this.exportRepository.create(createExportInput);
    await this.exportRepository.save(newExport);
    return newExport;
  }

  public async findExportById(id: string): Promise<ExportEntity> {
    const exportFound: ExportEntity = await this.getExport(id);
    if (!exportFound) {
      throw new NotFoundException(`Export with id - "${id}" not found`);
    }
    return exportFound;
  }

  public async updateExport(
    id: string,
    updateExportInput: CreateExportInput,
  ): Promise<ExportEntity> {
    const exportToUpdate: ExportEntity = await this.getExport(id);

    if (!exportToUpdate) {
      throw new NotFoundException(`Export with id - "${id}" not found`);
    }

    Object.assign(exportToUpdate, updateExportInput);

    // Save the updated entity
    const updatedWarehouse = await this.exportRepository.save(exportToUpdate);

    return updatedWarehouse;
  }

  public async deleteExport(id: string): Promise<string> {
    const exportToDelete: ExportEntity = await this.getExport(id);

    if (!exportToDelete) {
      throw new NotFoundException(`Export with id - "${id}" not found`);
    }

    await this.exportRepository.delete(id);
    return 'Export deleted successfully';
  }

  public async getExports(): Promise<ExportEntity[]> {
    const allExports: ExportEntity[] = await this.exportRepository.find();
    if (allExports.length === 0) {
      throw new NotFoundException('No exports found');
    }
    return allExports;
  }

  public async getExport(id: string): Promise<ExportEntity> {
    const exportFound: ExportEntity = await this.exportRepository.findOneBy({
      id,
    });
    if (!exportFound) {
      throw new NotFoundException(`Export with id - "${id}" not found`);
    }
    return exportFound;
  }

  public async getExportsByDate(
    startDate: string,
    endDate: string,
  ): Promise<ExportEntity[]> {
    const allExports: ExportEntity[] = await this.exportRepository
      .createQueryBuilder('export')
      .where('export.exportDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    if (allExports.length === 0) {
      throw new NotFoundException('No exports found for this date range');
    }

    return allExports;
  }

  public async executeExport(id: string): Promise<string> {
    const exportToExecute: ExportEntity = await this.getExport(id);

    if (!exportToExecute) {
      throw new NotFoundException(`Export with id - "${id}" not found`);
    }

    const productToExport: ProductEntity =
      await this.productRepository.findOneBy({
        id: exportToExecute.productId,
      });

    const exportFromWarehouse: WarehouseEntity =
      await this.warehouseRepository.findOneBy({
        id: productToExport.warehouseId,
      });

    const exportToWarehouse: WarehouseEntity =
      await this.warehouseRepository.findOneBy({
        id: exportToExecute.exportToWarehouseId,
      });

    if (exportFromWarehouse.id === exportToWarehouse.id) {
      throw new ConflictException(
        `Export from same warehouse "${exportFromWarehouse.name}" to warehouse "${exportToWarehouse.name}" is not allowed`,
      );
    }

    // Check if exportToWarehouse has enough space
    if (
      exportToWarehouse.stockCurrentCapacity + productToExport.productSize >
      exportToWarehouse.stockMaxCapacity
    ) {
      throw new ConflictException(
        `Warehouse "${exportToWarehouse.name}" does not have enough space for this product`,
      );
    }

    // Check if exported product is hazordous and warehouse will accept it
    if (productToExport.isHazardous !== exportToWarehouse.hazardous) {
      throw new ConflictException(
        `Export to warehouse "${exportToWarehouse.name}" accepts only ${
          exportToWarehouse.hazardous ? 'hazardous' : 'non-hazardous'
        } products`,
      );
    }

    // Update product warehouse
    productToExport.warehouseId = exportToWarehouse.id;
    await this.productRepository.save(productToExport);

    // Update exportFromWarehouse capacity
    exportFromWarehouse.stockCurrentCapacity -= productToExport.productSize;
    await this.warehouseRepository.save(exportFromWarehouse);

    // Update exportToWarehouse capacity
    exportToWarehouse.stockCurrentCapacity += productToExport.productSize;
    await this.warehouseRepository.save(exportToWarehouse);

    // Update export status
    // TODO add "status" field to entity
    // exportToExecute.status = 'executed';
    await this.exportRepository.save(exportToExecute);

    return 'Export executed successfully';
  }
}
