import type { Product } from './products';

export function searchProducts(
  products: Product[],
  query: string,
  {
    category,
    minPrice,
    maxPrice,
  }: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}
): Product[] {
  let filtered = products;

  // Full-text search
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p => {
      const searchFields = [p.name, p.category, p.description].join(' ').toLowerCase();
      return searchFields.includes(q);
    });
  }

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    filtered = filtered.filter(p => {
      const price = parseInt(p.price.replace(/[₹,]/g, ''), 10);
      if (minPrice !== undefined && price < minPrice) return false;
      if (maxPrice !== undefined && price > maxPrice) return false;
      return true;
    });
  }

  return filtered;
}

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: '₹0 - ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000+', min: 50000, max: Infinity },
];
