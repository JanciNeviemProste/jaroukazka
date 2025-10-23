import React, { useState } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { cn } from '../utils/cn';

interface BestsellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

type TabType = 'bestseller' | 'new' | 'sale' | 'premium';

const BestsellersSection: React.FC<BestsellersSectionProps> = ({ products, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<TabType>('bestseller');

  const tabs: { id: TabType; label: string; emoji: string }[] = [
    { id: 'bestseller', label: 'Bestsellery', emoji: '🔥' },
    { id: 'new', label: 'Novinky', emoji: '✨' },
    { id: 'sale', label: 'Akcie', emoji: '🏷️' },
    { id: 'premium', label: 'Premium', emoji: '👑' },
  ];

  // Filter products based on active tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'bestseller':
        return products.filter(p => p.badge === 'bestseller').slice(0, 4);
      case 'new':
        return products.filter(p => p.badge === 'new').slice(0, 4);
      case 'sale':
        return products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
      case 'premium':
        // Products with highest ratings
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
      default:
        return products.slice(0, 4);
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Obľúbené produkty
          </h2>
          <p className="text-lg text-gray-600">
            Vyberte si z našich najpopulárnejších produktov
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                  activeTab === tab.id
                    ? "bg-white text-primary-600 shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <span className="text-xl">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="transform transition-all duration-500 hover:scale-105"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Žiadne produkty v tejto kategórii
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              // Scroll to products section
              const productsSection = document.querySelector('#products-section');
              if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Zobraziť všetky produkty
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;