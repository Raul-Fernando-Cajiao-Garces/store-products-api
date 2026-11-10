import { Product } from '../domain/product.entity';
import { ProductRepository } from '../ports/product.repository';

export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (id: number): Promise<Product | null> => {
    return this.productRepository.findById(id);
  };
}
