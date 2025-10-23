import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Product } from '../types';
import { formatPrice, calculateDiscount, formatDiscountPercentage } from '../utils/price';
import { cn } from '../utils/cn';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGallery from '../components/ProductGallery';
import VariantSelector from '../components/VariantSelector';
import Rating from '../components/Rating';
import Tag from '../components/Tag';
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';

interface ProductDetailProps {
  onAddToCart: (product: Product, variant?: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    // Simulovať načítanie
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    // Nastaviť prvý variant ako predvolený
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product && !loading) {
    navigate('/404');
    return null;
  }

  const discount = product?.originalPrice
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const relatedProducts = products
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const breadcrumbs = [
    { label: 'Domov', href: '/' },
    { label: product?.category || 'Kategória', href: '/' },
    { label: product?.name || 'Produkt', href: '#' },
  ];

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product, selectedVariant);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton variant="text" width={200} height={20} className="mb-6" />
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton variant="rectangular" height={500} className="rounded-xl" />
              <div className="space-y-4">
                <Skeleton variant="text" width={150} height={16} />
                <Skeleton variant="text" width="100%" height={32} />
                <Skeleton variant="text" width={200} height={20} />
                <Skeleton variant="text" width={120} height={40} />
                <Skeleton variant="text" width="100%" height={100} />
                <Skeleton variant="rectangular" height={50} className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Product Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ProductGallery
            images={product.images || [product.image, product.image, product.image]}
            productName={product.name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Badges */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {product.category}
              </span>
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

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <Rating value={product.rating} count={product.reviewsCount} size="md" />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Tag
                    label={`Ušetríte ${formatPrice(product.originalPrice - product.price)}`}
                    variant="success"
                    size="md"
                  />
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={setSelectedVariant}
                label="Vyberte variant"
              />
            )}

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Množstvo
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg hover:border-primary-400 transition-colors"
                  aria-label="Znížiť množstvo"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center input"
                  min="1"
                  aria-label="Množstvo"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg hover:border-primary-400 transition-colors"
                  aria-label="Zvýšiť množstvo"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={cn(
                  'flex-1 btn btn-primary text-lg py-3',
                  !product.inStock && 'opacity-50 cursor-not-allowed'
                )}
              >
                {product.inStock ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6m0 0a1 1 0 100 2 1 1 0 000-2zm-10 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                    Pridať do košíka
                  </>
                ) : (
                  'Vypredané'
                )}
              </button>
              <button className="btn btn-ghost px-6">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-600 font-medium">Skladom</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-600 font-medium">Vypredané</span>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {product.tags.map((tag) => (
                <Tag key={tag} label={tag} variant="default" />
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Podobné produkty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;