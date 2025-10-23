import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice, calculateDiscount, formatDiscountPercentage } from '../utils/price';
import { cn } from '../utils/cn';
import Rating from './Rating';
import Tag from './Tag';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  selected?: boolean;
  onSelectToggle?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  selected = false,
  onSelectToggle,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const discount = product.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <article
      className={cn(
        'group relative bg-white rounded-xl transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        selected && 'ring-2 ring-primary-500 shadow-lg shadow-primary-100',
        !selected && 'shadow-soft'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection checkbox */}
      {onSelectToggle && (
        <button
          onClick={() => onSelectToggle(product)}
          className={cn(
            'absolute top-3 left-3 z-10 w-6 h-6 rounded-md transition-all duration-200',
            'border-2 flex items-center justify-center',
            selected
              ? 'bg-primary-500 border-primary-500 text-white'
              : 'bg-white/90 border-gray-300 hover:border-primary-400'
          )}
          aria-label={selected ? 'Odznačiť produkt' : 'Označiť produkt'}
        >
          {selected && (
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}

      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {product.badge === 'new' && (
          <Tag label="Novinka" variant="success" size="sm" />
        )}
        {product.badge === 'sale' && discount > 0 && (
          <Tag label={formatDiscountPercentage(discount)} variant="danger" size="sm" />
        )}
        {product.badge === 'bestseller' && (
          <Tag label="Bestseller" variant="warning" size="sm" />
        )}
      </div>

      {/* Image Container */}
      <Link
        to={`/produkt/${product.id}`}
        className="block aspect-square overflow-hidden rounded-t-xl bg-gray-100"
      >
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              isHovered ? 'scale-110' : 'scale-100',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
                Vypredané
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </div>

        {/* Name */}
        <Link
          to={`/produkt/${product.id}`}
          className="block mb-2"
        >
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <Rating value={product.rating} count={product.reviewsCount} size="sm" />
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            className={cn(
              'flex-1 btn btn-primary',
              !product.inStock && 'opacity-50 cursor-not-allowed'
            )}
          >
            {product.inStock ? 'Do košíka' : 'Vypredané'}
          </button>
          <Link
            to={`/produkt/${product.id}`}
            className="btn btn-ghost px-3"
            aria-label="Zobraziť detail produktu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;