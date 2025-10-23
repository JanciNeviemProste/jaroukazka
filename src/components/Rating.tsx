import React from 'react';
import { cn } from '../utils/cn';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = 'md',
  showCount = true,
  className,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value);
    const halfFilled = i === Math.floor(value) && value % 1 >= 0.5;

    return { filled, halfFilled, index: i };
  });

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center" role="img" aria-label={`Hodnotenie ${value} z 5 hviezdičiek`}>
        {stars.map(({ filled, halfFilled, index }) => (
          <div key={index} className="relative">
            {/* Background star */}
            <svg
              className={cn(sizeClasses[size], 'text-gray-200')}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Filled star */}
            {(filled || halfFilled) && (
              <svg
                className={cn(
                  sizeClasses[size],
                  'text-amber-400 absolute inset-0',
                  halfFilled && 'clip-path-half'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                style={halfFilled ? { clipPath: 'inset(0 50% 0 0)' } : {}}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-gray-500 text-sm ml-1">({count})</span>
      )}
    </div>
  );
};

export default Rating;