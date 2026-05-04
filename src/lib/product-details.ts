import type { Product } from './products';

export interface ProductDetailUtilities {
  // Get all product IDs for static path generation
  getAllProductIds: (products: Product[]) => string[];

  // Get product by ID
  getProductById: (products: Product[], id: string) => Product | undefined;

  // Get related products (same category, different product)
  getRelatedProducts: (products: Product[], currentId: string, limit?: number) => Product[];
}

export function getAllProductIds(products: Product[]): string[] {
  return products.map(p => p.id);
}

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getRelatedProducts(products: Product[], currentId: string, limit: number = 4): Product[] {
  const current = getProductById(products, currentId);
  if (!current) return [];

  return products
    .filter(p => p.category === current.category && p.id !== currentId)
    .slice(0, limit);
}

export function getProductMetadata(product: Product) {
  return {
    title: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
  };
}
