"use client";

import React, { useState } from 'react';
import { Info, Plus } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect from '@/src/shared/components/common/Selection/ReusableSelect';

const bookingTimeOptions = [
  { label: 'قبل موعد الجولة بوقت محدد', value: 'before-tour' },
  { label: 'حتى موعد بدء الجولة', value: 'until-start' },
  { label: 'الحجز متاح دائماً', value: 'always' },
  { label: 'تحديد وقت مخصص', value: 'custom' },
];
const bookingFrequencyOptions = [
  { label: 'مرة واحدة لكل مسافر', value: 'once-per-traveler' },
  { label: 'عدة مرات لكل مسافر', value: 'multiple-per-traveler' },
  { label: 'مرة واحدة لكل حجز', value: 'once-per-booking' },
  { label: 'حسب التوافر', value: 'availability' },
];
const confirmationOptions = [
  { label: 'تأكيد فوري', value: 'instant' },
  { label: 'تأكيد يدوي من مقدم الخدمة', value: 'manual' },
  { label: 'تأكيد بعد مراجعة الطلب', value: 'review' },
  { label: 'تأكيد حسب التوافر', value: 'availability' },
];

export default function BookingProcess() {
  const [bookingTime, setBookingTime] = useState('');
  const [bookingFrequency, setBookingFrequency] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [advanceMinutes, setAdvanceMinutes] = useState('120');
  const [allowFreeCancellation, setAllowFreeCancellation] = useState(false);
  const [cancellationHours, setCancellationHours] = useState('24');
  const [extraRequirements, setExtraRequirements] = useState(false);

  const handleSave = () => {
    if (!bookingTime || !bookingFrequency || !confirmation) return;
    alert('تم حفظ إعدادات عملية الحجز بنجاح!');
  };

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">80%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-4/5 rounded-full bg-emerald-500" /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        الآن دعنا نقوم بتخصيص عملية الحجز الخاصة بك
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-3 md:px-6">
        <section className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">كيف تريد وضع وقت الحجز الخاص بك؟</label>
          <ReusableSelect placeholder="اختر وقت الحجز" options={bookingTimeOptions} selectedValues={bookingTime ? [bookingTime] : []} onChange={(values) => setBookingTime(values[0] || '')} multiple={false} starredOptionSupport identityColor compact />
          {bookingTime ? (
            <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-800"><Info size={16} className="mt-0.5 shrink-0" /><span>{bookingTime === 'always' ? 'يمكن للمسافرين الحجز في أي وقت.' : 'حدد وقتاً واضحاً حتى يعرف المسافرون متى يتوقف قبول الحجوزات.'}</span></div>
          ) : <button type="button" onClick={() => setExtraRequirements((current) => !current)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><Plus size={15} />إضافة تفاصيل وقت الحجز</button>}
          {extraRequirements && <input type="text" placeholder="أضف تفاصيل وقت الحجز" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />}
        </section>

        <section className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">ما هو عدد مرات الحجز المتاحة للمسافر؟</label>
          <ReusableSelect placeholder="اختر عدد مرات الحجز" options={bookingFrequencyOptions} selectedValues={bookingFrequency ? [bookingFrequency] : []} onChange={(values) => setBookingFrequency(values[0] || '')} multiple={false} starredOptionSupport identityColor compact />
          {bookingFrequency && <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-800"><Info size={16} className="mt-0.5 shrink-0" /><span>يمكنك تحديد عدد الحجوزات المسموح بها لكل مسافر.</span></div>}
        </section>

        <section className="space-y-2">
          <label className="block text-sm font-semibold text-foreground">كيف سيتم تأكيد حجزك؟</label>
          <ReusableSelect placeholder="اختر طريقة تأكيد الحجز" options={confirmationOptions} selectedValues={confirmation ? [confirmation] : []} onChange={(values) => setConfirmation(values[0] || '')} multiple={false} starredOptionSupport identityColor compact />
          {confirmation && <div className="flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-relaxed text-amber-800"><Info size={16} className="mt-0.5 shrink-0" /><span>{confirmation === 'instant' ? 'سيحصل المسافر على تأكيد الحجز فور إتمام الدفع.' : 'ستحتاج إلى مراجعة طلب الحجز وتأكيده للمسافر.'}</span></div>}
        </section>

        {bookingTime && bookingTime !== 'always' && (
          <label className="block max-w-sm space-y-2 text-sm font-semibold text-foreground">
            <span>ما الحد الأدنى للوقت المطلوب للحجز مسبقاً؟</span>
            <div className="flex items-center gap-2"><input type="number" min="0" value={advanceMinutes} onChange={(event) => setAdvanceMinutes(event.target.value)} className="w-28 rounded-lg border border-border px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-primary" /><span className="font-normal text-muted-foreground">دقيقة</span></div>
          </label>
        )}

        <section className="space-y-2 border-t border-border pt-4">
          <label className="flex cursor-pointer items-start gap-2 text-sm font-semibold text-primary">
            <input type="checkbox" checked={allowFreeCancellation} onChange={(event) => setAllowFreeCancellation(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            هل تسمح للمسافرين بالإلغاء المجاني قبل موعد الجولة؟
          </label>
          {allowFreeCancellation && <div className="space-y-2 rounded-lg bg-muted/40 p-3"><label htmlFor="cancellation-hours" className="block text-sm text-foreground">يمكن للمسافر إلغاء الحجز مجاناً قبل موعد الجولة بـ</label><div className="flex items-center gap-2"><input id="cancellation-hours" type="number" min="0" value={cancellationHours} onChange={(event) => setCancellationHours(event.target.value)} className="w-28 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /><span className="text-sm text-muted-foreground">ساعة</span></div></div>}
        </section>

        <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={handleSave}>حفظ والاستمرار</ReusableButton></div>
      </div>
    </div>
  );
}
