"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect, { SelectOption } from '@/src/shared/components/common/Selection/ReusableSelect';

interface ProductTypeOption {
  id: string;
  title: string;
  description: string;
}

export default function Classification() {
  const [selectedType, setSelectedType] = useState<string>('trip');
  const [selectedTransport, setSelectedTransport] = useState<string[]>(['land', 'sea', 'air']);

  const options: ProductTypeOption[] = [
    {
      id: 'trip',
      title: 'رحلة',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    },
    {
      id: 'activity',
      title: 'نشاط',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    },
    {
      id: 'ticket',
      title: 'تذكرة أو تصريح',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    },
    {
      id: 'rental',
      title: 'الإيجار',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    },
    {
      id: 'transit',
      title: 'النقل و المواصلات',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    },
    {
      id: 'local',
      title: 'الأنشطة المحلية',
      description: 'نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)/نص إفتراضي(وصف الإختيار)'
    }
  ];

  const transportOptions: SelectOption[] = [
    { value: 'land', label: 'نقل بري', starred: true },
    { value: 'sea', label: 'نقل بحري', starred: true },
    { value: 'air', label: 'نقل جوي', starred: true }
  ];

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>أ-الأساسيات</span>
        <span>&gt;</span>
        <span className="text-primary">2.أ.التصنيف</span>
      </div>

      {/* Primary Header Card */}
      <div className="border border-primary/30 bg-white rounded-3xl p-5 shadow-xs flex items-start gap-4">
        <Info className="text-primary shrink-0 mt-1" size={24} />
        <div className="space-y-1">
          <h2 className="text-[17px] font-black text-gray-800">ما نوع المنتج الذي تقوم بإنشائه؟</h2>
          <p className="text-xs text-gray-400 font-bold">نقترح عليك إستخدام لغتك القوية</p>
        </div>
      </div>

      {/* Warning Box */}
      <div className="border border-primary/30 bg-white rounded-3xl p-5 shadow-xs flex items-start gap-4">
        <Info className="text-primary shrink-0 mt-1" size={24} />
        <div className="space-y-1">
          <h2 className="text-[17px] font-black text-gray-800">هل عدت لتعديل نوع المنتج الخاص بك؟</h2>
          <p className="text-primary text-xs font-bold leading-relaxed">
            لقد تم تخصيص المعلومات التي أدخلتها في الشاشات اللاحقة لنوع المنتج الذي اخترته في الأصل بدلاً من تغيير نوع المنتج، يرجى البدء من جديد وإنشاء منتج جديد.
          </p>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-4 max-w-4xl">
        {options.map((opt) => {
          const isSelected = selectedType === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setSelectedType(opt.id)}
              className={`p-5 px-6 rounded-3xl border transition-all duration-200 flex items-center justify-between cursor-pointer select-none ${
                isSelected
                  ? 'border-[hsl(var(--primary))] bg-primary/5 shadow-xs'
                  : 'border-gray-150 hover:border-gray-200 bg-white'
              }`}
            >
              {/* Radio Content Right */}
              <div className="space-y-1.5 flex-1 pr-2">
                <h3 className="text-[16px] font-black text-gray-800">{opt.title}</h3>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed max-w-3xl">
                  {opt.description}
                </p>
              </div>

              {/* Radio Indicator Left */}
              <div className="shrink-0 flex items-center justify-center pl-2">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? 'border-[hsl(var(--primary))]' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="w-3 h-3 rounded-full bg-primary" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conditional Sub-options for Trip */}
      {selectedType === 'trip' && (
        <div className="max-w-4xl border-2 border-dashed border-primary/30 rounded-3xl p-6 bg-card space-y-6">
          <div className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-2xl w-fit">
            <span className="text-primary font-black text-sm flex items-center gap-2">
              🚗 رحلة
            </span>
          </div>

          <ReusableSelect
            label="-ما هي وسائل النقل المستخدمة أثناء الجولة؟"
            placeholder="إختر وسيلة أو أكثر"
            options={transportOptions}
            selectedValues={selectedTransport}
            onChange={setSelectedTransport}
            multiple={true}
          />
        </div>
      )}

      {/* Action Save Button */}
      <div className="pt-4">
        <ReusableButton variant="secondary">
          الحفظ و الإستمرار
        </ReusableButton>
      </div>
    </div>
  );
}
