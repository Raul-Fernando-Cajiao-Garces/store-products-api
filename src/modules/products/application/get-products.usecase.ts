import { Product } from '../domain/product.entity';
import { ProductRepository } from '../ports/product.repository';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (): Promise<Product[]> => {
    return this.productRepository.findAll();
  };
}
