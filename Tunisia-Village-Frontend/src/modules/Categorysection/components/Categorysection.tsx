'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export const CategorySection: React.FC = () => {
  const [active, setActive] = useState('accommodation');

  const categories = [
    { id: 'accommodation', label: 'الإقامة', src: '/imgs/hosting.png', color: 'hsl(var(--primary))', bg: 'hsl(var(--primary) / 0.08)' },
    { id: 'activities', label: 'الأنشطة', src: '/imgs/kayaking.png', color: 'hsl(var(--accent))', bg: 'hsl(var(--accent) / 0.08)' },
    { id: 'market', label: 'المتجر الحرفي', src: '/imgs/pottery.png', color: 'hsl(var(--secondary-foreground))', bg: 'hsl(var(--secondary) / 0.6)' },
    { id: 'restaurants', label: 'المطاعم', src: '/imgs/food_cat.png', color: 'hsl(var(--warning, 37 90% 50%))', bg: 'hsl(var(--warning, 37 90% 50%) / 0.1)' },
    { id: 'transfers', label: 'الإنتقالات', src: '/imgs/trans_cat.png', color: 'hsl(var(--primary))', bg: 'hsl(var(--primary) / 0.05)' },
    { id: 'courses', label: 'الدورات', src: '/imgs/amico.png', color: 'hsl(var(--accent))', bg: 'hsl(var(--accent) / 0.05)' },
  ];

  return (
    <section className="py-[40px] text-center pb-10">
      <div className="mb-10">
        <h2 className="text-[clamp(22px,4vw,32px)] flex gap-3 items-center justify-center font-bold text-foreground mb-3 font-heading">
          <>
            اكتشف قلب
            <span className="text-primary">الفيوم</span>
          </>
        </h2>
        <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
          مع كل تجربة جديدة حيث يلتقي سحر الطبيعة بعراقة التاريخ.
        </p>
      </div>

      <div className="flex gap-4 justify-center flex-wrap mx-auto max-w-6xl px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`group flex flex-1 flex-col overflow-hidden rounded-2xl cursor-pointer border-2
              transition-all duration-300 bg-card
              min-w-[140px] max-w-[200px] shadow-sm hover:-translate-y-1 
              hover:shadow-md ${
                active === cat.id
                  ? 'border-primary shadow-md shadow-primary/10'
                  : 'border-transparent'
              }`}
            onClick={() => setActive(cat.id)}
          >
            <div
              className="w-full h-full py-6 px-4 flex gap-3 flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ background: cat.bg }}
            >
              <Image 
                src={cat.src}
                width={80}
                height={80}
                alt={`${cat.label} image`}
                className="w-20 h-20 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
              />
              <span
                className="text-[16px] font-bold transition-colors duration-200 text-center"
                style={{ color: active === cat.id ? cat.color : 'hsl(var(--muted-foreground))' }}
              >
                {cat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};