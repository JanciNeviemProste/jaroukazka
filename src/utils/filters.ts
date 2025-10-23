import { Product, FilterOptions } from '../types';

export function filterProducts(products: Product[], filters: FilterOptions): Product[] {
  let filtered = [...products];

  // Search filter
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories.includes(product.category)
    );
  }

  // Price filter
  filtered = filtered.filter(product =>
    product.price >= filters.minPrice &&
    product.price <= filters.maxPrice
  );

  // Tags filter
  if (filters.tags.length > 0) {
    filtered = filtered.filter(product =>
      filters.tags.some(tag => product.tags.includes(tag))
    );
  }

  // Sorting
  switch (filters.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filtered;
}

export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories).sort();
}

export function getUniqueTags(products: Product[]): string[] {
  const tags = new Set(products.flatMap(product => product.tags));
  return Array.from(tags).sort();
}

export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 1000 };

  const prices = products.map(product => product.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}