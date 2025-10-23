import React, { useState, useMemo, useEffect } from 'react';
import { products as allProducts } from '../data/products';
import { FilterOptions, PaginationOptions } from '../types';
import {
  filterProducts,
  getUniqueCategories,
  getUniqueTags,
  getPriceRange,
} from '../utils/filters';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import Breadcrumbs from '../components/Breadcrumbs';
import USPSection from '../components/USPSection';
import HeroSlider from '../components/HeroSlider';
import BestsellersSection from '../components/BestsellersSection';

interface HomeProps {
  searchQuery: string;
  onAddToCart: (product: any) => void;
}

const Home: React.FC<HomeProps> = ({ searchQuery, onAddToCart }) => {
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
    tags: [],
    sortBy: 'rating',
  });

  const [pagination, setPagination] = useState<PaginationOptions>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  });

  // Získať unikátne kategórie, tagy a cenový rozsah
  const categories = useMemo(() => getUniqueCategories(allProducts), []);
  const tags = useMemo(() => getUniqueTags(allProducts), []);
  const priceRange = useMemo(() => getPriceRange(allProducts), []);

  // Inicializovať filtre s správnym cenovým rozsahom
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }));
  }, [priceRange]);

  // Aktualizovať search query vo filtroch
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchQuery,
    }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, [searchQuery]);

  // Simulovať načítanie
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filtrovať produkty
  const filteredProducts = useMemo(
    () => filterProducts(allProducts, filters),
    [filters]
  );

  // Stránkovať produkty
  const paginatedProducts = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, pagination.currentPage, pagination.itemsPerPage]);

  // Aktualizovať celkový počet položiek
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredProducts.length,
    }));
  }, [filteredProducts.length]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToggle = (product: any) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(product.id)) {
        newSet.delete(product.id);
      } else {
        newSet.add(product.id);
      }
      return newSet;
    });
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      tags: [],
      sortBy: 'rating',
    });
  };

  const breadcrumbs = [
    { label: 'Domov', href: '/' },
    { label: 'Produkty', href: '/' },
  ];

  // Oznámiť počet výsledkov pre screen reader
  const resultsAnnouncement = filteredProducts.length === 0
    ? 'Žiadne produkty nenájdené'
    : filteredProducts.length === 1
    ? 'Nájdený 1 produkt'
    : `Nájdených ${filteredProducts.length} produktov`;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Slider - Full Width */}
      <HeroSlider />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} className="mb-6" />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Zdravotnícky Šatník - štýl má význam
          </h1>
          <p className="text-gray-600">
            Moderné zdravotnícke oblečenie spojujúce funkčnosť, komfort a dizajn. Certifikované, priedušné a odolné materiály.
          </p>
        </div>
      </div>

      {/* USP/Benefits Section - Full Width */}
      <USPSection />

      {/* Bestsellers Section - Full Width */}
      <BestsellersSection products={allProducts} onAddToCart={onAddToCart} />

      <div className="container mx-auto px-4 py-8" id="products-section">

        {/* Search Results Announcement */}
        {searchQuery && (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {resultsAnnouncement}
          </div>
        )}

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <Filters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              tags={tags}
              priceRange={priceRange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results count and selected items */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length === 0 ? (
                  'Žiadne produkty'
                ) : (
                  <>
                    Zobrazuje sa{' '}
                    <span className="font-medium text-gray-900">
                      {filteredProducts.length}
                    </span>{' '}
                    {filteredProducts.length === 1 ? 'produkt' : 'produktov'}
                  </>
                )}
              </p>
              {selectedProducts.size > 0 && (
                <p className="text-primary-600 font-medium">
                  Vybraných: {selectedProducts.size}
                </p>
              )}
            </div>

            {/* Products Grid or Empty State */}
            {!loading && filteredProducts.length === 0 ? (
              <EmptyState
                title="Žiadne produkty nenájdené"
                description="Skúste upraviť filtre alebo vyhľadávacie kritériá"
                action={{
                  label: 'Vymazať filtre',
                  onClick: handleClearFilters,
                }}
              />
            ) : (
              <>
                <ProductGrid
                  products={paginatedProducts}
                  onAddToCart={onAddToCart}
                  selectedProducts={selectedProducts}
                  onSelectToggle={handleSelectToggle}
                  loading={loading}
                />

                {/* Pagination */}
                {!loading && filteredProducts.length > 0 && (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    className="mt-8"
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;