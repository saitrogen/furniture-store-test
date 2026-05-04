import React from 'react';
import type { Product } from '../lib/products';
import { getRelatedProducts } from '../lib/product-details';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  imageBase?: string;
}

export default function RelatedProducts({
  currentProduct,
  allProducts,
  imageBase = '',
}: RelatedProductsProps) {
  const related = getRelatedProducts(allProducts, currentProduct.id, 4);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-border-light">
      <h2 className="text-2xl font-bold text-text-primary mb-8">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <ProductCard product={product} imageBase={imageBase} />
          </a>
        ))}
      </div>
    </section>
  );
}
