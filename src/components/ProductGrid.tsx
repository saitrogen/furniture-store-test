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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full transition ${
            selectedCategory === 'all'
              ? 'bg-brand text-white'
              : 'bg-white border border-border text-text-primary hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === cat
                ? 'bg-brand text-white'
                : 'bg-white border border-border text-text-primary hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Range Filters */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="priceMin" className="text-sm font-medium text-text-muted">
            Min Price:
          </label>
          <input
            id="priceMin"
            type="number"
            placeholder="0"
            value={priceMin ?? ''}
            onChange={(e) => setPriceMin(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-24 px-2 py-1 border border-border rounded text-sm"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="priceMax" className="text-sm font-medium text-text-muted">
            Max Price:
          </label>
          <input
            id="priceMax"
            type="number"
            placeholder="∞"
            value={priceMax ?? ''}
            onChange={(e) => setPriceMax(e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-24 px-2 py-1 border border-border rounded text-sm"
          />
        </div>

        {activeFilters > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-accent hover:opacity-75 font-semibold"
          >
            Clear all ({activeFilters})
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-text-muted">
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
        <div className="text-center py-12 text-text-muted">
          <p className="text-lg">No products found</p>
          <p className="text-sm mt-2">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
