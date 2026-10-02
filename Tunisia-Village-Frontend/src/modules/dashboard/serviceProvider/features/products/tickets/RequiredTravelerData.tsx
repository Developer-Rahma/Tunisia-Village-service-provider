"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

const requiredFields = ['الاسم الأول', 'اسم العائلة', 'البريد الإلكتروني', 'رقم الهاتف', 'رقم جواز السفر'];
const additionalFieldGroups = [
  { title: 'معلومات الاتصال', fields: ['البريد الإلكتروني', 'رقم الهاتف'] },
  { title: 'معلومات المسافر', fields: ['تاريخ الميلاد', 'الجنسية', 'رقم جواز السفر'] },
  { title: 'معلومات صحية', fields: ['الحالات الصحية', 'الحساسية أو الاحتياجات الخاصة'] },
  { title: 'معلومات إضافية', fields: ['تفضيلات المسافر', 'ملاحظات خاصة'] },
];

export default function RequiredTravelerData() {
  const [required, setRequired] = useState<string[]>(['الاسم الأول', 'اسم العائلة', 'البريد الإلكتروني']);
  const [collectionTiming, setCollectionTiming] = useState('booking');
  const [additional, setAdditional] = useState<string[]>([]);

  const toggle = (value: string, values: string[], setValues: React.Dispatch<React.SetStateAction<string[]>>) => {
    setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const handleSave = () => alert('تم حفظ بيانات المسافر المطلوبة بنجاح!');

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-5xl items-start gap-2 rounded-lg border border-primary/40 bg-white px-4 py-3 text-sm leading-relaxed text-primary">
        <Info size={17} className="mt-0.5 shrink-0" />
        <p>أخبر المسافرين بالمعلومات التي ستحتاجها منهم لإتمام الحجز والاستعداد للجولة.</p>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-3 py-3 md:px-6">
        <section className="space-y-3">
          <div>
            <h1 className="text-base font-semibold text-foreground">حدد المعلومات الشخصية التي تحتاجها من جميع المسافرين</h1>
            <p className="mt-1 text-sm text-muted-foreground">اختر البيانات التي يجب على المسافر تقديمها عند الحجز.</p>
          </div>
          <div className="space-y-1">
            {requiredFields.map((field, index) => (
              <label key={field} className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground ${index % 2 === 0 ? 'bg-muted/50' : 'bg-white'}`}>
                <input type="checkbox" checked={required.includes(field)} onChange={() => toggle(field, required, setRequired)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                {field}
              </label>
            ))}
          </div>
        </section>

        <fieldset className="space-y-2 border-t border-border pt-4">
          <legend className="text-sm font-semibold text-foreground">متى تريد جمع هذه المعلومات؟</legend>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground"><input type="radio" name="traveler-data-timing" checked={collectionTiming === 'booking'} onChange={() => setCollectionTiming('booking')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" /><span>أثناء إتمام الحجز</span></label>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground"><input type="radio" name="traveler-data-timing" checked={collectionTiming === 'before-tour'} onChange={() => setCollectionTiming('before-tour')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" /><span>بعد الحجز وقبل موعد الجولة</span></label>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground"><input type="radio" name="traveler-data-timing" checked={collectionTiming === 'lead-traveler'} onChange={() => setCollectionTiming('lead-traveler')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" /><span>من المسافر الرئيسي لجميع أفراد المجموعة</span></label>
          <p className="flex items-start gap-2 pt-1 text-sm text-primary"><Info size={15} className="mt-0.5 shrink-0" />يساعدك جمع المعلومات مسبقاً على تجهيز الجولة وتقديم تجربة أفضل.</p>
        </fieldset>

        <section className="space-y-4 border-t border-border pt-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">حدد المعلومات الإضافية التي تحتاجها من المسافرين</h2>
            <p className="mt-1 text-sm text-muted-foreground">يمكنك اختيار أي تفاصيل تساعدك على تلبية احتياجاتهم.</p>
          </div>
          {additionalFieldGroups.map((group) => (
            <fieldset key={group.title} className="space-y-1">
              <legend className="mb-1 text-sm font-semibold text-primary">{group.title}</legend>
              {group.fields.map((field, index) => (
                <label key={field} className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm text-foreground ${index % 2 === 0 ? 'bg-muted/50' : 'bg-white'}`}>
                  <input type="checkbox" checked={additional.includes(field)} onChange={() => toggle(field, additional, setAdditional)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                  {field}
                </label>
              ))}
            </fieldset>
          ))}
        </section>

        <div className="flex justify-center border-t border-border pt-4">
          <ReusableButton type="button" onClick={handleSave}>حفظ والاستمرار</ReusableButton>
        </div>
      </div>
    </div>
  );
}
