"use client";

import React, { useState } from 'react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect from '@/src/shared/components/common/Selection/ReusableSelect';

const refundOptions = [
  { label: 'استرداد كامل عند الإلغاء ضمن المدة المحددة', value: 'full' },
  { label: 'استرداد جزئي حسب سياسة الإلغاء', value: 'partial' },
  { label: 'لا يوجد استرداد للأموال', value: 'none' },
];
const refundTimeOptions = [
  { label: 'خلال 5 إلى 7 أيام عمل', value: '5-7' },
  { label: 'خلال 3 إلى 5 أيام عمل', value: '3-5' },
  { label: 'خلال 10 أيام عمل', value: '10' },
  { label: 'يعتمد على طريقة الدفع', value: 'payment-method' },
];

export default function TicketRefund() {
  const [refundType, setRefundType] = useState('');
  const [refundTiming, setRefundTiming] = useState('');
  const [refundDetails, setRefundDetails] = useState('');

  const handleSave = () => {
    if (!refundType || (refundType !== 'none' && !refundTiming)) return;
    alert('تم حفظ تفاصيل استرداد التذاكر بنجاح!');
  };

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">80%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-4/5 rounded-full bg-emerald-500" /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        أضف تفاصيل حول استرداد تذاكرك
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-3 md:px-6">
        <section className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">هل سيحصل المسافرون على استرداد للأموال؟</label>
          <ReusableSelect placeholder="اختر سياسة استرداد الأموال" options={refundOptions} selectedValues={refundType ? [refundType] : []} onChange={(values) => { setRefundType(values[0] || ''); setRefundTiming(''); }} multiple={false} starredOptionSupport={false} compact identityColor />
          {refundType === 'none' && <p className="text-sm text-muted-foreground">أخبر المسافرين بوضوح أن التذاكر غير قابلة للاسترداد.</p>}
        </section>

        <section className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">متى سيسترد المسافرون أموالهم؟</label>
          <ReusableSelect placeholder="اختر المدة المتوقعة للاسترداد" options={refundTimeOptions} selectedValues={refundTiming ? [refundTiming] : []} onChange={(values) => setRefundTiming(values[0] || '')} multiple={false} starredOptionSupport={false} compact identityColor />
          <p className="text-sm text-muted-foreground">ستختلف مدة وصول المبلغ بحسب البنك أو وسيلة الدفع المستخدمة.</p>
        </section>

        <section className="space-y-2">
          <label htmlFor="refund-details" className="block text-sm font-semibold text-foreground">أضف أي تفاصيل إضافية لاسترداد الأموال (اختياري)</label>
          <textarea id="refund-details" value={refundDetails} onChange={(event) => setRefundDetails(event.target.value)} rows={4} maxLength={1000} placeholder="اكتب أي معلومات إضافية توضح للمسافرين طريقة استرداد الأموال." className="w-full resize-y rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          <p className="text-left text-xs text-muted-foreground">{refundDetails.length}/1000</p>
        </section>

        <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={handleSave}>حفظ والاستمرار</ReusableButton></div>
      </div>
    </div>
  );
}
