import { Product, CreateProductDTO } from '../domain/product.entity';

export interface ProductRepository {
  findAll: () => Promise<Product[]>;
  findById: (id: number) => Promise<Product | null>;
  save: (data: CreateProductDTO) => Promise<Product>;
  reset: () => Promise<void>;
}
