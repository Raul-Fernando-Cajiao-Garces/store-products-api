import express, { Express, Request, Response } from 'express';
import { InMemoryProductRepository } from './modules/products/adapters/in-memory-product.repository';
import { GetProductsUseCase } from './modules/products/application/get-products.usecase';
import { CreateProductUseCase } from './modules/products/application/create-product.usecase';
import { GetProductByIdUseCase } from './modules/products/application/get-product-by-id.usecase';
import { ProductController } from './modules/products/http/product.controller';
import { createProductRouter } from './modules/products/http/product.routes';

const productRepository = new InMemoryProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const createProductUseCase = new CreateProductUseCase(productRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);

const productController = new ProductController(
  getProductsUseCase,
  createProductUseCase,
  getProductByIdUseCase
);

const app: Express = express();

app.use(express.json());

// Routes
app.use('/products', createProductRouter(productController));

// Root health check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Store Products API operativa',
    endpoints: {
      list: 'GET /products',
      create: 'POST /products',
      getById: 'GET /products/:id'
    }
  });
});

// 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

export { app, productRepository };
export default app;
