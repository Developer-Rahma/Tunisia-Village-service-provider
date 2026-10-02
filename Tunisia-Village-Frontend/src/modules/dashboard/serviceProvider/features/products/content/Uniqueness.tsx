"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

export default function Uniqueness() {
  const [description, setDescription] = useState('');
  const [isPrivateTour, setIsPrivateTour] = useState(true);
  const [maximumTravelers, setMaximumTravelers] = useState('');
  const [canCustomize, setCanCustomize] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const hasValidDescription = description.trim().length >= 100;
  const hasValidGroupSize = isPrivateTour || (Boolean(maximumTravelers) && Number(maximumTravelers) >= 1);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!hasValidDescription || !hasValidGroupSize) return;
    alert('تم حفظ البيانات بنجاح!');
  };

  return (
    <div className="min-h-full space-y-6 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 border-b border-border px-4 pb-3" dir="ltr">
        <span className="text-sm font-bold text-primary">40%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 rounded-full bg-primary" /></div>
      </div>

      <div className="mx-auto w-fit bg-muted px-6 py-2 text-center">
        <h1 className="text-xl font-bold text-primary md:text-2xl">ما الذي يميز جولتك؟</h1>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-3">
          <label htmlFor="tour-uniqueness-description" className="block text-base font-semibold text-primary">شجّع المسافرين على حجز تجربتك من خلال تقديم وصف دقيق ومميز.</label>
          <textarea
            id="tour-uniqueness-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={1000}
            rows={5}
            placeholder="أضف وصفاً مناسباً وجذاباً لجولتك"
            className="w-full resize-y rounded-xl border border-border bg-white p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className={hasValidDescription ? 'text-primary' : 'text-muted-foreground'}>مطلوب 100 حرف على الأقل</span>
            <span className="text-muted-foreground">{description.trim().length} / 1000</span>
          </div>
          {submitted && !hasValidDescription && <p className="text-sm font-medium text-destructive">يرجى كتابة وصف لا يقل عن 100 حرف.</p>}
        </div>

        <section className="space-y-4 border-t border-border pt-5">
          <fieldset className="space-y-3">
            <legend className="text-base font-semibold text-primary">هل هذه جولة خاصة؟</legend>
            <div className="flex flex-wrap gap-6">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="private-tour" checked={isPrivateTour} onChange={() => setIsPrivateTour(true)} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم</label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="private-tour" checked={!isPrivateTour} onChange={() => setIsPrivateTour(false)} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا</label>
            </div>
            <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-primary"><Info size={16} className="mt-0.5 shrink-0" /><p>الجولات الخاصة تستوعب مجموعة واحدة فقط لكل حجز.</p></div>
          </fieldset>

          <div className="grid gap-6 border-t border-dashed border-border pt-5 md:grid-cols-2">
            <fieldset disabled={isPrivateTour} className={`space-y-3 transition-opacity ${isPrivateTour ? 'opacity-50' : ''}`}>
              <label htmlFor="maximum-travelers" className="block text-sm font-semibold text-foreground">أدخل الحد الأقصى لعدد المسافرين الذين يمكنهم المشاركة</label>
              <input id="maximum-travelers" type="number" min={1} value={maximumTravelers} onChange={(event) => setMaximumTravelers(event.target.value)} placeholder="أدخل رقماً" className="w-full max-w-xs rounded-lg border border-border bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              {submitted && !isPrivateTour && (!maximumTravelers || Number(maximumTravelers) < 1) && <p className="text-sm text-destructive">أدخل عدداً صحيحاً لا يقل عن 1.</p>}
            </fieldset>

            <fieldset disabled={!isPrivateTour} className={`space-y-3 transition-opacity ${!isPrivateTour ? 'opacity-50' : ''}`}>
              <legend className="text-sm font-semibold text-foreground">هل يمكن للمسافرين تخصيص هذه الجولة؟</legend>
              <div className="flex flex-wrap gap-6">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="customizable-tour" checked={canCustomize} onChange={() => setCanCustomize(true)} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم</label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="customizable-tour" checked={!canCustomize} onChange={() => setCanCustomize(false)} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا</label>
              </div>
            </fieldset>
          </div>
        </section>

        <div className="flex justify-center border-t border-border pt-4">
          <ReusableButton type="submit">حفظ والاستمرار</ReusableButton>
        </div>
      </form>
    </div>
  );
}
