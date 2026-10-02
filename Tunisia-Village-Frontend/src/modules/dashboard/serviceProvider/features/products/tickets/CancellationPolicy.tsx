"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect from '@/src/shared/components/common/Selection/ReusableSelect';

const cancellationDeadlines = [
  { label: 'قبل 12 ساعة من موعد الجولة', value: '12' },
  { label: 'قبل 24 ساعة من موعد الجولة', value: '24' },
  { label: 'قبل 48 ساعة من موعد الجولة', value: '48' },
  { label: 'قبل 72 ساعة من موعد الجولة', value: '72' },
  { label: 'قبل 7 أيام من موعد الجولة', value: '168' },
];

export default function CancellationPolicy() {
  const [policy, setPolicy] = useState<'flexible' | 'non-refundable'>('flexible');
  const [deadline, setDeadline] = useState('24');
  const [partialRefund, setPartialRefund] = useState(false);
  const [refundPercentage, setRefundPercentage] = useState('50');
  const [allowChanges, setAllowChanges] = useState(true);

  const handleSave = () => alert('تم حفظ سياسة الإلغاء بنجاح!');

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">80%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-4/5 rounded-full bg-emerald-500" /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        سياسة الإلغاء الخاصة بك
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-3 md:px-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-foreground">كيف تصف سياسة الإلغاء الخاصة بك؟</legend>

          <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-foreground">
            <input type="radio" name="cancellation-policy" checked={policy === 'flexible'} onChange={() => setPolicy('flexible')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>إلغاء مرن واسترداد كامل</span>
          </label>
          {policy === 'flexible' && (
            <div className="me-6 max-w-2xl space-y-2">
              <p className="text-sm leading-relaxed text-muted-foreground">يمكن للمسافرين إلغاء الحجز واسترداد المبلغ كاملاً حتى الموعد الذي تحدده.</p>
              <ReusableSelect placeholder="اختر الموعد النهائي للإلغاء" options={cancellationDeadlines} selectedValues={[deadline]} onChange={(values) => setDeadline(values[0] || '24')} multiple={false} starredOptionSupport={false} compact identityColor />
              <button type="button" className="text-sm font-semibold text-primary hover:underline">عرض تفاصيل سياسة الإلغاء</button>
            </div>
          )}

          <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-foreground">
            <input type="radio" name="cancellation-policy" checked={policy === 'non-refundable'} onChange={() => setPolicy('non-refundable')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>غير قابلة للاسترداد</span>
          </label>
          {policy === 'non-refundable' && <p className="me-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">لا يمكن استرداد قيمة الحجز عند الإلغاء. سيظهر ذلك بوضوح للمسافرين قبل إتمام الحجز.</p>}
        </fieldset>

        <div className="border-t border-border pt-4">
          <h2 className="mb-3 text-sm font-semibold text-foreground">هل ترغب في إضافة شروط أخرى؟</h2>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="checkbox" checked={partialRefund} onChange={(event) => setPartialRefund(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>تقديم استرداد جزئي عند الإلغاء بعد الموعد النهائي</span>
          </label>
          {partialRefund && <div className="me-6 mt-3 flex flex-wrap items-center gap-2"><label htmlFor="refund-percentage" className="text-sm text-foreground">نسبة المبلغ المسترد</label><input id="refund-percentage" type="number" min="0" max="100" value={refundPercentage} onChange={(event) => setRefundPercentage(event.target.value)} className="w-24 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /><span className="text-sm text-muted-foreground">٪</span></div>}
          <label className="mt-3 flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="checkbox" checked={allowChanges} onChange={(event) => setAllowChanges(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>السماح للمسافرين بتعديل الحجز قبل موعد الجولة</span>
          </label>
        </div>

        <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-800">
          <Info size={16} className="mt-0.5 shrink-0" />
          <span>تأكد من أن سياسة الإلغاء واضحة ومتوافقة مع الشروط التي تعرضها للمسافرين.</span>
        </div>

        <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={handleSave}>حفظ والاستمرار</ReusableButton></div>
      </div>
    </div>
  );
}
