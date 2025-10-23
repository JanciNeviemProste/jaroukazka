import React from 'react';
import { cn } from '../utils/cn';

interface VariantSelectorProps {
  variants: string[];
  selectedVariant: string;
  onVariantSelect: (variant: string) => void;
  label?: string;
  className?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect,
  label = 'Variant',
  className,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant}
            onClick={() => onVariantSelect(variant)}
            className={cn(
              'px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200',
              selectedVariant === variant
                ? 'border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-200'
                : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-gray-50'
            )}
            aria-label={`Vybrať variant ${variant}`}
            aria-pressed={selectedVariant === variant}
          >
            {variant}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;