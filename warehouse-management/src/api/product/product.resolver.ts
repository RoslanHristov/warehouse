import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput, UpdateProductInput } from 'src/types/graphql';
import { ProductEntity } from 'src/libs/entities/product.entity';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation('createProduct')
  public async createProduct(
    @Args('CreateProductInput') createWarehouseInput: CreateProductInput,
  ): Promise<ProductEntity> {
    return this.productService.createProduct(createWarehouseInput);
  }

  @Mutation('deleteProduct')
  public async deleteProduct(@Args('id') id: string): Promise<string> {
    return this.productService.deleteProduct(id);
  }

  @Mutation('updateProduct')
  public async updateProduct(
    @Args('id') id: string,
    @Args('UpdateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(id, updateProductInput);
  }

  @Query('findAllProducts')
  public async findAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAllProducts();
  }

  @Query('findProductById')
  public async findProductById(@Args('id') id: string): Promise<ProductEntity> {
    return this.productService.findProductById(id);
  }
}
