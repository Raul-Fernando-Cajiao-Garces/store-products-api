import { Request, Response } from 'express';
import { GetProductsUseCase } from '../application/get-products.usecase';
import { CreateProductUseCase } from '../application/create-product.usecase';
import { GetProductByIdUseCase } from '../application/get-product-by-id.usecase';
import { validateProductInput } from '../domain/product.entity';

export class ProductController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.getProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = validateProductInput(req.body);
      if (!validation.isValid) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const { name, price, stock, category } = req.body;
      const created = await this.createProductUseCase.execute({
        name,
        price,
        stock,
        category
      });

      res.status(201).json(created);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al crear el producto';
      res.status(400).json({ error: message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'El identificador debe ser un número entero' });
        return;
      }

      const product = await this.getProductByIdUseCase.execute(id);
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
}
