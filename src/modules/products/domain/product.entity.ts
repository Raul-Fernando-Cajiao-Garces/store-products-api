export interface Product {
  id: number;
  name: string;
  price: number;
  stock?: number;
  category?: string;
}

export interface CreateProductDTO {
  name: string;
  price: number;
  stock?: number;
  category?: string;
}

export interface ProductValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateProductInput = (data: Partial<CreateProductDTO>): ProductValidationResult => {
  const { name, price } = data;

  if (
    name === undefined ||
    name === null ||
    typeof name !== 'string' ||
    name.trim() === '' ||
    price === undefined ||
    price === null ||
    (typeof price === 'string' && (price as string).trim() === '')
  ) {
    return {
      isValid: false,
      error: 'El nombre y el precio son obligatorios'
    };
  }

  if (typeof price !== 'number' || isNaN(price) || price <= 0) {
    return {
      isValid: false,
      error: 'El precio debe ser un número mayor que 0'
    };
  }

  return {
    isValid: true
  };
};
