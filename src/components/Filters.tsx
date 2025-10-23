import React, { useState } from 'react';
import { FilterOptions } from '../types';
import { cn } from '../utils/cn';
import { formatPrice } from '../utils/price';

interface FiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
  tags: string[];
  priceRange: { min: number; max: number };
  className?: string;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  tags,
  priceRange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice.toString());
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice.toString());

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];

    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];

    onFiltersChange({
      ...filters,
      tags: newTags,
    });
  };

  const handlePriceChange = () => {
    onFiltersChange({
      ...filters,
      minPrice: Number(localMinPrice) || priceRange.min,
      maxPrice: Number(localMaxPrice) || priceRange.max,
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const resetFilters = () => {
    setLocalMinPrice(priceRange.min.toString());
    setLocalMaxPrice(priceRange.max.toString());
    onFiltersChange({
      searchQuery: '',
      categories: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      tags: [],
      sortBy: 'rating',
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.tags.length +
    (filters.minPrice !== priceRange.min ? 1 : 0) +
    (filters.maxPrice !== priceRange.max ? 1 : 0);

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden btn btn-secondary w-full mb-4"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtre
        {activeFiltersCount > 0 && (
          <span className="ml-2 bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filters panel */}
      <div
        className={cn(
          'bg-white rounded-xl shadow-soft p-6 space-y-6',
          'lg:block',
          !isOpen && 'hidden lg:block',
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filtre</h2>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Vymazať všetko
            </button>
          )}
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Zoradiť podľa</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
            className="w-full input"
            aria-label="Zoradiť produkty"
          >
            <option value="rating">Najlepšie hodnotené</option>
            <option value="price-asc">Cena: od najnižšej</option>
            <option value="price-desc">Cena: od najvyššej</option>
            <option value="name">Názov: A-Z</option>
          </select>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Kategórie</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer hover:text-primary-600"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Cena</h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              onBlur={handlePriceChange}
              placeholder="Min"
              className="input"
              min={priceRange.min}
              max={priceRange.max}
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              onBlur={handlePriceChange}
              placeholder="Max"
              className="input"
              min={priceRange.min}
              max={priceRange.max}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{formatPrice(priceRange.min)}</span>
            <span>{formatPrice(priceRange.max)}</span>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Štítky</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm transition-colors',
                  filters.tags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;