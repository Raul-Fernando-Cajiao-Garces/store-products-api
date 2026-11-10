import request from 'supertest';
import { app, productRepository } from '../../app';

describe('Store Products API - Automated Test Suite', () => {
  beforeEach(async () => {
    await productRepository.reset();
  });

  describe('GET /products', () => {
    it('debe responder 200 y devolver un arreglo de productos', async () => {
      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(2);

      const firstProduct = response.body[0];
      expect(firstProduct).toHaveProperty('id', 1);
      expect(firstProduct).toHaveProperty('name', 'Camiseta básica');
      expect(firstProduct).toHaveProperty('price', 15.5);
      expect(firstProduct).toHaveProperty('stock', 40);
      expect(firstProduct).toHaveProperty('category', 'ropa');
    });
  });

  describe('POST /products', () => {
    it('debe responder 201 y devolver el producto creado con su id para datos válidos', async () => {
      const newProductPayload = {
        name: 'Zapatos deportivos',
        price: 59.99,
        stock: 25,
        category: 'calzado'
      };

      const response = await request(app)
        .post('/products')
        .send(newProductPayload);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(typeof response.body.id).toBe('number');
      expect(response.body.name).toBe('Zapatos deportivos');
      expect(response.body.price).toBe(59.99);
      expect(response.body.stock).toBe(25);
      expect(response.body.category).toBe('calzado');

      // Verificar que se listó en el catálogo
      const listResponse = await request(app).get('/products');
      expect(listResponse.body.some((p: { id: number }) => p.id === response.body.id)).toBe(true);
    });

    it('debe responder 400 con mensaje de error si falta el nombre', async () => {
      const response = await request(app)
        .post('/products')
        .send({ price: 20 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El nombre y el precio son obligatorios'
      });
    });

    it('debe responder 400 con mensaje de error si falta el precio', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Mochila' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El nombre y el precio son obligatorios'
      });
    });

    it('debe responder 400 si el precio es igual a 0', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Llavero', price: 0 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El precio debe ser un número mayor que 0'
      });
    });

    it('debe responder 400 si el precio es negativo', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Cuaderno', price: -5.5 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El precio debe ser un número mayor que 0'
      });
    });

    it('debe responder 400 si el precio es de tipo texto', async () => {
      const response = await request(app)
        .post('/products')
        .send({ name: 'Gorra', price: 'gratis' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El precio debe ser un número mayor que 0'
      });
    });
  });

  describe('GET /products/:id (Reto Opcional)', () => {
    it('debe responder 200 y el producto correspondiente cuando el id existe', async () => {
      const response = await request(app).get('/products/1');

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Camiseta básica');
    });

    it('debe responder 404 con mensaje en español cuando el id no existe', async () => {
      const response = await request(app).get('/products/9999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Producto no encontrado'
      });
    });

    it('debe responder 400 si el id no es un número entero válido', async () => {
      const response = await request(app).get('/products/abc');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'El identificador debe ser un número entero'
      });
    });
  });
});
