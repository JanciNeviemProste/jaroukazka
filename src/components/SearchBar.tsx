import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Hľadať produkty...',
  className,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'relative flex items-center transition-all duration-200',
          isFocused && 'scale-[1.02]'
        )}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-4 py-2.5 rounded-xl border-2 transition-all duration-200',
            'placeholder:text-gray-400 text-gray-700',
            isFocused
              ? 'border-primary-500 ring-4 ring-primary-100 bg-white'
              : 'border-gray-200 hover:border-primary-300 bg-gray-50',
            'focus:outline-none'
          )}
          aria-label="Vyhľadávanie produktov"
        />
        <svg
          className={cn(
            'absolute left-3 w-5 h-5 pointer-events-none transition-colors duration-200',
            isFocused ? 'text-primary-500' : 'text-gray-400'
          )}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Vymazať vyhľadávanie"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;