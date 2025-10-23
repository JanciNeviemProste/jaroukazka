import React from 'react';
import { cn } from '../utils/cn';

interface TagProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  label,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  className,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    warning: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {label}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:opacity-70 focus:outline-none"
          aria-label={`Odstrániť ${label}`}
        >
          <svg
            className="w-3 h-3"
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
    </span>
  );
};

export default Tag;