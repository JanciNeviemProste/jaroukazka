export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tags: string[];
  category: string;
  image: string;
  images?: string[];
  variants?: string[];
  description?: string;
  inStock: boolean;
  badge?: 'new' | 'sale' | 'bestseller';
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface FilterOptions {
  searchQuery: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  tags: string[];
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name';
}

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface Breadcrumb {
  label: string;
  href: string;
}