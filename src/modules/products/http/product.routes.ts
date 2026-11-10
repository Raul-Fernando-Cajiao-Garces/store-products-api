import { Router } from 'express';
import { ProductController } from './product.controller';

export const createProductRouter = (controller: ProductController): Router => {
  const router = Router();

  router.get('/', controller.getAll);
  router.post('/', controller.create);
  router.get('/:id', controller.getById);

  return router;
};
