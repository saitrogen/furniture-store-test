import React from 'react';
import type { Product } from '../lib/products';
import { searchProducts } from '../lib/search';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  categories: string[];
  imageBase?: string;
}

export default function ProductGrid({ products, categories, imageBase = '' }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [priceMin, setPriceMin] = React.useState<number | undefined>();
  const [priceMax, setPriceMax] = React.useState<number | undefined>();

  const filteredProducts = React.useMemo(() => {
    return searchProducts(products, searchQuery, {
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      minPrice: priceMin,
      maxPrice: priceMax,
    });
  }, [products, searchQuery, selectedCategory, priceMin, priceMax]);

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceMin(undefined);
    setPriceMax(undefined);
  };

  const activeFilters = [
    searchQuery && 'Search',
    selectedCategory !== 'all' && `Category: ${selectedCategory}`,
    priceMin !== undefined && `Min: ₹${priceMin}`,
    priceMax !== undefined && `Max: ₹${priceMax}`,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Range Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="priceMin" className="text-sm font-medium text-text-muted">
            Min Price:
          </label>
          <input
            id="priceMin"
            type="number"
            placeholder="₹0"
            value={priceMin ?? ''}
            onChange={(e) => setPriceMin(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-32"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="priceMax" className="text-sm font-medium text-text-muted">
            Max Price:
          </label>
          <input
            id="priceMax"
            type="number"
            placeholder="₹100,000"
            value={priceMax ?? ''}
            onChange={(e) => setPriceMax(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-32"
          />
        </div>

        {activeFilters > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-primary-dark hover:opacity-70 font-semibold underline"
          >
            Clear all ({activeFilters})
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-text-muted font-medium">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} imageBase={imageBase} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-text-muted">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-sm">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
