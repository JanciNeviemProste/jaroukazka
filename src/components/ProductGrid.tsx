import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { cn } from '../utils/cn';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedProducts?: Set<string>;
  onSelectToggle?: (product: Product) => void;
  loading?: boolean;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  selectedProducts = new Set(),
  onSelectToggle,
  loading = false,
  className,
}) => {
  if (loading) {
    return (
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
          className
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-soft animate-pulse"
          >
            <div className="aspect-square bg-gray-200 rounded-t-xl" />
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-5 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        className
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          selected={selectedProducts.has(product.id)}
          onSelectToggle={onSelectToggle}
        />
      ))}
    </div>
  );
};

export default ProductGrid;