import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { cn } from '../utils/cn';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartItemsCount, onCartClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ak sme na vrchu stránky, vždy zobraziť header
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Ak scrollujeme dole a sme viac ako 50px od vrchu, skryť header
      else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      // Ak scrollujeme hore, zobraziť header
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            Zdravotnícky Šatník
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Cart and Navigation */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Domov
              </Link>
              <Link
                to="/kategorie"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Kategórie
              </Link>
              <Link
                to="/akcie"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                Akcie
              </Link>
            </nav>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className={cn(
                "relative p-2 text-gray-700 hover:text-primary-600 transition-colors",
                "hover:bg-primary-50 rounded-lg"
              )}
              aria-label="Otvoriť košík"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6m0 0a1 1 0 100 2 1 1 0 000-2zm-10 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <Link
            to="/"
            className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm"
          >
            Domov
          </Link>
          <Link
            to="/kategorie"
            className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm"
          >
            Kategórie
          </Link>
          <Link
            to="/akcie"
            className="text-gray-700 hover:text-primary-600 transition-colors font-medium text-sm"
          >
            Akcie
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;