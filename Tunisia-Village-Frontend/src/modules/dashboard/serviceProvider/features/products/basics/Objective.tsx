"use client";

import React, { useState } from 'react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect, { SelectOption } from '@/src/shared/components/common/Selection/ReusableSelect';

export default function Objective() {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(['art-design']);

  const attributesOptions: SelectOption[] = [
    { value: 'art-design', label: 'فن، تصميم، موضة', starred: true },
    { value: 'entertainment', label: 'تسلية' },
    { value: 'food-drink', label: 'طعام و شراب' },
    { value: 'health-fitness', label: 'صحة و لياقة' },
    { value: 'history-culture', label: 'تاريخ و ثقافة' }
  ];

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>أ-الأساسيات</span>
        <span>&gt;</span>
        <span className="text-primary">3.أ.السمة</span>
      </div>

      {/* Main Form Fields */}
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-1">
          <h2 className="text-[17px] font-black text-gray-800 leading-normal">
            -إختر أكثر من 3 سمات تصف هذا المنتج على الوجه الأفضل!
          </h2>
          <p className="text-xs text-primary font-bold">
            قم بزيادة ظهورك في عمليات البحث عن السفر من خلال تحديد جميع الموضوعات الثلاثة
          </p>
        </div>

        {/* Dynamic Multi-Select Dropdown */}
        <div className="pt-2">
          <ReusableSelect
            placeholder="فن، تصميم، موضة"
            options={attributesOptions}
            selectedValues={selectedAttributes}
            onChange={setSelectedAttributes}
            multiple={true}
            starredOptionSupport={true}
          />
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