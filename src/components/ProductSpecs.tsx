import React from 'react';
import type { Product } from '../lib/products';

interface ProductSpecsProps {
  product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  const [expandedSpec, setExpandedSpec] = React.useState<string | null>('description');

  // Parse specifications from product description (this is a basic example)
  // In production, you'd store specs separately in products.json
  const specs = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'details',
      title: 'Details',
      items: [
        { label: 'Product ID', value: product.id },
        { label: 'Category', value: product.category },
        { label: 'Price', value: `₹${product.price}` },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Seller',
      content: `WhatsApp: +${product.whatsapp}`,
    },
  ];

  return (
    <div className="space-y-4">
      {specs.map((spec) => (
        <div
          key={spec.id}
          className="border border-border-light rounded-lg overflow-hidden transition-all duration-200"
        >
          <button
            onClick={() => setExpandedSpec(expandedSpec === spec.id ? null : spec.id)}
            className="w-full px-5 py-4 flex items-center justify-between bg-surface-light hover:bg-surface-lighter transition-colors duration-200"
          >
            <h4 className="font-semibold text-text-primary">{spec.title}</h4>
            <span
              className={`text-text-muted transition-transform duration-200 ${expandedSpec === spec.id ? 'rotate-180' : ''
                }`}
            >
              ▼
            </span>
          </button>

          {expandedSpec === spec.id && (
            <div className="px-5 py-4 bg-white border-t border-border-light animate-in fade-in duration-200">
              {'content' in spec ? (
                <p className="text-text-secondary text-sm leading-relaxed">{spec.content}</p>
              ) : (
                <div className="space-y-3">
                  {spec.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <span className="text-sm text-text-muted font-medium">{item.label}</span>
                      <span className="text-sm text-text-primary font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Stock Status */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-sm text-emerald-900 font-medium">✓ In Stock</p>
        <p className="text-xs text-emerald-800 mt-1">Available for immediate inquiries</p>
      </div>
    </div>
  );
}
