import { Product, CreateProductDTO } from '../domain/product.entity';
import { ProductRepository } from '../ports/product.repository';

export const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Camiseta básica', price: 15.5, stock: 40, category: 'ropa' },
  { id: 2, name: 'Taza de cerámica', price: 6.9, stock: 120, category: 'hogar' }
];

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[];
  private nextId: number;

  constructor(initialProducts: Product[] = INITIAL_PRODUCTS) {
    this.products = initialProducts.map((item) => ({ ...item }));
    this.nextId = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
  }

  findAll = async (): Promise<Product[]> => {
    return this.products.map((item) => ({ ...item }));
  };

  findById = async (id: number): Promise<Product | null> => {
    const found = this.products.find((p) => p.id === id);
    return found ? { ...found } : null;
  };

  save = async (data: CreateProductDTO): Promise<Product> => {
    const newProduct: Product = {
      id: this.nextId++,
      name: data.name,
      price: data.price,
      stock: data.stock !== undefined ? data.stock : 0,
      category: data.category !== undefined ? data.category : 'general'
    };
    this.products.push({ ...newProduct });
    return { ...newProduct };
  };

  reset = async (): Promise<void> => {
    this.products = INITIAL_PRODUCTS.map((item) => ({ ...item }));
    this.nextId = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;
  };
}
