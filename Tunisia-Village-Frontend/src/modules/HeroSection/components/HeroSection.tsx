import React from 'react';
import { SearchTabs } from '@/src/shared/components/common/Search/SearchTabs';
import { Button } from '@/src/shared/components/common/Buttons/button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1440&q=90')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-10" />

      <div className="relative z-20 text-center px-6 mt-16 mb-12">
        <h1 className="text-[40px] md:text-[54px] font-extrabold text-white leading-[1.2] mb-3 drop-shadow-lg animate-fade-in-up" style={{ animationFillMode: 'forwards', animationDuration: '0.7s' }}>
          كل رحلة تُحدث تغييرًا.
        </h1>
        <p className="text-[15px] md:text-[18px] text-white/95 max-w-[620px] mx-auto mb-8 leading-[1.7] drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.15s', animationFillMode: 'both', animationDuration: '0.7s' }}>
          مرحبًا بكم في لوحة معلومات تأثير أنس - حيث تُساهم حجوزاتكم في زراعة الأشجار،
          وخلق فرص عمل، وتمكين حياة الناس.
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both', animationDuration: '0.7s' }}>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3.5 text-[16px] font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer">
            احسب الأثر
          </button>
          <button className="bg-card hover:bg-muted text-primary border border-primary/20 rounded-full px-8 py-3.5 text-[16px] font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer">
            احجز تجربة الان
          </button>
        </div>
      </div>

      <div className="relative z-20 w-full px-4 md:px-6 lg:px-12 animate-fade-in-up" style={{ animationDelay: '0.45s', animationFillMode: 'both', animationDuration: '0.7s' }}>
        <SearchTabs />
      </div>
    </section>
  );
};
