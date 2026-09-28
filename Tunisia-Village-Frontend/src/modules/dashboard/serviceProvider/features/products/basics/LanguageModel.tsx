"use client";

import React, { useState } from 'react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

export default function LanguageModel() {
  const [langPreference, setLangPreference] = useState('manual');
  const [productTitle, setProductTitle] = useState('');
  const [refCode, setRefCode] = useState('');

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>أ-الأساسيات</span>
        <span>&gt;</span>
        <span className="text-[#334bb1]">1.أ.اللغة و العنوان</span>
      </div>

      {/* Start Header Card */}
      <div className="flex items-center gap-3 bg-[#f2f6ff] px-5 py-3 rounded-2xl w-fit">
        <span className="text-2xl">😊</span>
        <span className="text-[#1d275f] font-black text-lg">هيا بنا نبدأ</span>
      </div>

      {/* Form Body */}
      <div className="space-y-6 max-w-2xl">
        {/* Select language */}
        <div className="space-y-2">
          <label className="block text-[15px] font-black text-gray-800">
            -إختر اللغة التي تود إستخدامها في كتابة تفاصيل منتجاتك:
          </label>
          <div className="relative w-80">
            <select className="w-full py-3.5 pr-10 pl-4 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#334bb1] cursor-pointer">
              <option value="en">⭐ الإنجليزية</option>
              <option value="ar">العربية</option>
              <option value="fr">الفرنسية</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              ▼
            </div>
          </div>
          <p className="text-xs text-gray-400 font-semibold pr-2">نقترح عليك إستخدام لغتك القوية</p>
        </div>

        {/* Translation method */}
        <div className="space-y-3 pt-2">
          <label className="block text-[15px] font-black text-gray-800">
            -كيف تفضل أن تتم ترجمة تفاصيل منتجك؟
          </label>
          <div className="space-y-3.5 pr-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="radio" 
                name="translation" 
                value="manual"
                checked={langPreference === 'manual'}
                onChange={() => setLangPreference('manual')}
                className="w-5 h-5 text-[#334bb1] border-gray-300 focus:ring-[#334bb1] cursor-pointer accent-[#334bb1]" 
              />
              <span className="text-sm font-extrabold text-gray-700">إضافة ترجمة يدوية</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input 
                type="radio" 
                name="translation" 
                value="auto"
                checked={langPreference === 'auto'}
                onChange={() => setLangPreference('auto')}
                className="w-5 h-5 text-[#334bb1] border-gray-300 focus:ring-[#334bb1] cursor-pointer accent-[#334bb1]" 
              />
              <span className="text-sm font-extrabold text-gray-700">إستخدام ترجمة آلية &quot;مستحسن&quot;</span>
            </label>
          </div>
        </div>

        {/* Product Title */}
        <div className="space-y-2 pt-2">
          <label className="block text-[15px] font-black text-gray-800">
            -ما هو عنوان منتجك؟
          </label>
          <input 
            type="text" 
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            placeholder="اكتب عنوان المنتج هنا..."
            className="w-full max-w-xl py-4 px-5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#334bb1] focus:bg-white text-right text-sm font-bold text-gray-800 transition-colors"
          />
          <p className="text-xs text-gray-400 font-semibold pr-2">
            العنوان الجيد سوف يساعدك لجذب المسافرين المناسبين في كل الأماكن المناسبة
          </p>
        </div>

        {/* Reference Code */}
        <div className="space-y-2 pt-2">
          <label className="block text-[15px] font-black text-gray-800">
            -الكود المرجعي للمنتج &quot;إختياري&quot;:
          </label>
          <input 
            type="text" 
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            placeholder="مثال: PRD-12345"
            className="w-full max-w-xl py-4 px-5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#334bb1] focus:bg-white text-right text-sm font-bold text-gray-800 transition-colors"
          />
          <p className="text-xs text-gray-400 font-semibold pr-2">تعيين كود مرجعي لمنتجك لإستخدامك الداخلي</p>
        </div>

        {/* Save Button */}
        <div className="pt-6">
          <ReusableButton variant="secondary">
            الحفظ و الإستمرار
          </ReusableButton>
        </div>
      </div>
    </div>
  );
}