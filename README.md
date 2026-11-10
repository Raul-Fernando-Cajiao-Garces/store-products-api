# 🛒 Store Products API

API REST para la gestión del catálogo de productos de una tienda en memoria, construida con **Node.js**, **Express**, **TypeScript**, y probada exhaustivamente con **Jest** y **Supertest**. Desarrollada bajo principios de **Clean Architecture (Hexagonal)**, **Clean Code** y el protocolo estricto de **GitHub Flow**.

---

## 📌 Información Académica
- **Institución:** Universidad Tecnológica Israel (UISRAEL)
- **Asignatura:** Desarrollo de Software II
- **Docente:** MSc. Viviana Flores
- **Estudiante:** Raúl Fernando Cajiao Garcés
- **Semana:** Semana 1 - Actividad 1
- **Fecha:** Noviembre 2026

---

## 🏗️ Arquitectura del Proyecto

El proyecto implementa los principios de Arquitectura Hexagonal y Separación de Responsabilidades:

```
src/
├── app.ts                       # Configuración principal de Express e inyección de dependencias
├── server.ts                    # Punto de entrada del servidor HTTP
└── modules/
    └── products/
        ├── domain/              # Entidades puras y reglas de validación (sin dependencias externas)
        │   └── product.entity.ts
        ├── ports/               # Contratos e interfaces del repositorio (puertos secundarios)
        │   └── product.repository.ts
        ├── adapters/            # Implementaciones concretas de puertos (en memoria con copias seguras)
        │   └── in-memory-product.repository.ts
        ├── application/         # Casos de uso de la aplicación
        │   ├── get-products.usecase.ts
        │   ├── create-product.usecase.ts
        │   └── get-product-by-id.usecase.ts
        └── http/                # Controladores y enrutadores Express (adaptador primario)
            ├── product.controller.ts
            └── product.routes.ts
```

---

## 🚀 Requisitos y Configuración

### Prerrequisitos
- **Node.js** v20 o superior (probado en Node.js v22.20.0)
- **npm** v10 o superior

### Instalación
```bash
git clone https://github.com/Raul-Fernando-Cajiao-Garces/store-products-api.git
cd store-products-api
npm install
```

### Ejecución en Modo Desarrollo
```bash
npm run dev
```

### Compilación y Ejecución en Producción
```bash
npm run build
npm start
```

---

## 🧪 Pruebas Automatizadas

El proyecto incluye 10 pruebas automatizadas con **Jest** y **Supertest**, cubriendo:
- `GET /products`: Retorno de catálogo en formato arreglo con los 2 productos iniciales de prueba (Camiseta básica y Taza de cerámica).
- `POST /products`: Creación exitosa de producto válido con asignación automática de ID (201).
- `POST /products`: Validación de obligatoriedad de nombre y precio (400).
- `POST /products`: Validación de precio mayor que 0 (cero, negativos y tipos no numéricos) (400).
- `GET /products/:id`: Reto opcional para consulta por ID (200) y manejo de no encontrado (404) o ID no numérico (400).

Para ejecutar las pruebas:
```bash
npm test
```

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción | Código Exitoso | Códigos de Error |
|---|---|---|---|---|
| `GET` | `/products` | Devuelve la lista completa de productos | `200 OK` | `500` |
| `POST` | `/products` | Registra un nuevo producto | `201 Created` | `400 Bad Request` |
| `GET` | `/products/:id` | Reto opcional: Obtiene un producto por su ID | `200 OK` | `400`, `404 Not Found` |

### Ejemplo de Payload para Crear Producto (`POST /products`):
```json
{
  "name": "Zapatos deportivos",
  "price": 59.99,
  "stock": 25,
  "category": "calzado"
}
```

### Respuestas de Error:
- Falta nombre o precio:
  ```json
  { "error": "El nombre y el precio son obligatorios" }
  ```
- Precio menor o igual a cero / inválido:
  ```json
  { "error": "El precio debe ser un número mayor que 0" }
  ```

---

## 📬 Colección de Postman / Bruno
El archivo `Store API.postman_collection.json` se encuentra en la raíz del repositorio y está listo para ser importado en Postman o Bruno. Cuenta con la variable `{{baseUrl}} = http://localhost:3000` y scripts de aserción automatizados para cada solicitud.
