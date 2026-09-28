"use client";

import React, { useState } from 'react';
import { Lightbulb, Image as ImageIcon, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

export default function Images() {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'upload'>('guidelines');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock carousel images
  const carouselImages = [
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=350&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=350&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=350&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=350&auto=format&fit=crop",
  ];

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>أ-الأساسيات</span>
        <span>&gt;</span>
        <span className="text-primary">4.أ.الصور</span>
      </div>

      {/* Tab Selectors */}
      <div className="w-full flex rounded-2xl overflow-hidden border border-gray-150 shadow-xs">
        <button
          onClick={() => setActiveTab('guidelines')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-black transition-all ${
            activeTab === 'guidelines'
              ? 'bg-[hsl(var(--primary))] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Lightbulb size={18} className={activeTab === 'guidelines' ? "text-primarymber-400 fill-amber-400" : ""} />
          <span>إرشادات لتجربة أفضل</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-4 flex items-center justify-center gap-2 font-black transition-all ${
            activeTab === 'upload'
              ? 'bg-[hsl(var(--primary))] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ImageIcon size={18} />
          <span>إضافة صور</span>
        </button>
      </div>

      {activeTab === 'guidelines' ? (
        <div className="space-y-8">
          {/* Rules / DOs & DONTs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DOs (Right Card in RTL) */}
            <div className="border border-primary/30 bg-white rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-[16px] font-black text-gray-800 flex items-center gap-2">
                <CheckCircle size={18} className="text-primary" />
                يمكنك إتباع الآتي للحصول على تجربة جيدة
              </h3>
              <ul className="space-y-3.5 pr-2">
                <li className="text-xs text-gray-500 font-bold leading-relaxed flex items-start gap-2">
                  <span className="text-primary">⭐</span>
                  <span>يجب أن يتضمن 6+ صور على الأقل و أن تستخدم فقط صورك الخاصة</span>
                </li>
                <li className="text-xs text-gray-500 font-bold leading-relaxed flex items-start gap-2">
                  <span className="text-primary">⭐</span>
                  <span>أضف صوراً صريحة للمسافر</span>
                </li>
              </ul>
            </div>

            {/* DONTs (Left Card in RTL) */}
            <div className="border border-accent/30 bg-card rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-[16px] font-black text-gray-800 flex items-center gap-2">
                <AlertTriangle size={18} className="text-accent" />
                عليك تجنب الآتي للحصول على تجربة أفضل
              </h3>
              <ul className="space-y-3.5 pr-2">
                <li className="text-xs text-gray-500 font-bold leading-relaxed flex items-start gap-2">
                  <span className="text-accent">⚠️</span>
                  <span>تجنب إستخدام لقطات الشاشة أو العلامات المائية أو الصور المجمعة.</span>
                </li>
                <li className="text-xs text-gray-500 font-bold leading-relaxed flex items-start gap-2">
                  <span className="text-accent">⚠️</span>
                  <span>تجنب إستخدام صوراً ضبابية أو داكنة</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Carousel Preview Area */}
          <div className="border border-border rounded-3xl p-6 bg-card shadow-xs space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-gray-900">ما هو الموجود في صورة الترحيب؟</h3>
              <p className="text-sm text-gray-400 font-semibold leading-relaxed">
                الصور هي التي تحفز الانطباعات الأولى للمسافرين وما الذي يتوقعونه
              </p>
            </div>

            {/* Image Grid Mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {carouselImages.map((src, index) => (
                <div key={index} className="aspect-4/3 rounded-2xl overflow-hidden shadow-xs border border-gray-100 hover:scale-102 transition-transform duration-200">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Indicators and Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              {/* Dot Indicators */}
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    onClick={() => setCurrentSlide(dot)}
                    className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                      currentSlide === dot ? "bg-primary scale-110" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Action Next button */}
              <ReusableButton
                variant="primary"
                icon={<ArrowLeft size={16} />}
                iconPosition="left"
              >
                التالي
              </ReusableButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-250 rounded-3xl p-16 text-center bg-white">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
            📥
          </div>
          <h3 className="text-lg font-black text-gray-800 mb-2">رفع صور جديدة</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
            قم بسحب وإسقاط الصور هنا، أو اضغط لتحديد ملفات من جهازك.
          </p>
          <ReusableButton variant="outline" className="mx-auto">
            اختيار ملفات
          </ReusableButton>
        </div>
      )}
    </div>
  );
}