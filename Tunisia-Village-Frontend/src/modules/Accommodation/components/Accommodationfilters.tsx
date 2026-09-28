'use client';

import { ACCOMMODATION_TYPES } from '@/src/shared/lib/consts/data';
import React, { useState } from 'react';

interface AccommodationFiltersProps {
  onTypeChange?: (type: string) => void;
  onPriceChange?: (range: [number, number]) => void;
}

export const AccommodationFilters: React.FC<AccommodationFiltersProps> = ({
  onTypeChange,
  onPriceChange,
}) => {
  const [activeType, setActiveType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(600);

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onTypeChange?.(type);
  };

  return (
    <div className="flex items-center gap-6 py-4 flex-wrap">

      <div className="flex gap-2 flex-wrap flex-1 justify-start">
        {ACCOMMODATION_TYPES.map((type) => (
          <button
            key={type.id}
            className={`py-2 px-[18px] border-[1.5px] rounded-full text-sm font-medium cursor-pointer transition-all duration-200 whitespace-nowrap
               ${activeType === type.id ?
                'text-primary-foreground bg-accent border-accent font-semibold shadow-sm shadow-accent/20' : 'bg-accent hover:bg-card text-primary-foreground hover:border-primary hover:text-primary'}`}
            onClick={() => handleTypeChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 min-w-[160px]">
        <span className="text-[13px] font-semibold text-muted-foreground">السعر</span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-accent">٢٠٠</span>
          <input
            type="range"
            min="200"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-[120px] h-1 rounded-sm appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            style={{
              background: `linear-gradient(to left, hsl(var(--accent)) 0%, hsl(var(--primary)) ${((maxPrice - 200) / 800) * 100}%, hsl(var(--border)) ${((maxPrice - 200) / 800) * 100}%)`
            }}
          />
          <span className="text-[13px] font-semibold text-primary">{maxPrice}</span>
        </div>
      </div>


    </div>
  );
};