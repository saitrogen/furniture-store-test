import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  whatsapp: string;
  images: string[];
}

export async function loadProducts(): Promise<Product[]> {
  try {
    // Try to read from public folder first
    const publicPath = path.join(process.cwd(), 'public', 'products.json');
    if (fs.existsSync(publicPath)) {
      const content = fs.readFileSync(publicPath, 'utf-8');
      return JSON.parse(content);
    }

    // Fallback to root directory
    const rootPath = path.join(process.cwd(), 'products.json');
    if (fs.existsSync(rootPath)) {
      const content = fs.readFileSync(rootPath, 'utf-8');
      return JSON.parse(content);
    }

    console.warn('products.json not found');
    return [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

export function getUniqCategories(products: Product[]): string[] {
  const categories = products.map(p => p.category);
  return Array.from(new Set(categories)).sort();
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products
    .map(p => {
      const num = p.price.replace(/[₹,]/g, '');
      return parseInt(num, 10);
    })
    .filter(n => !isNaN(n));

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
