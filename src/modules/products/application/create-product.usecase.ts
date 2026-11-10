import { Product, CreateProductDTO, validateProductInput } from '../domain/product.entity';
import { ProductRepository } from '../ports/product.repository';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (data: CreateProductDTO): Promise<Product> => {
    const validation = validateProductInput(data);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    return this.productRepository.save(data);
  };
}
