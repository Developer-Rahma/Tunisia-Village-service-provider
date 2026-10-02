"use client";

import React, { useState } from 'react';
import { CalendarDays, Heart, Info, Tag } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

type OfferStage = 'intro' | 'details' | 'preview' | 'skipped';

export default function DemoOffer() {
  const [stage, setStage] = useState<OfferStage>('intro');
  const [wantsOffer, setWantsOffer] = useState<'yes' | 'no'>('yes');
  const [offerStart, setOfferStart] = useState('');
  const [offerEnd, setOfferEnd] = useState('');
  const [discount, setDiscount] = useState('20');
  const [bookingStart, setBookingStart] = useState('');
  const [bookingEnd, setBookingEnd] = useState('');
  const [tourStart, setTourStart] = useState('');
  const [tourEnd, setTourEnd] = useState('');
  const [audience, setAudience] = useState('all');
  const [audienceTypes, setAudienceTypes] = useState<string[]>(['new']);

  const continueFromIntro = () => setStage(wantsOffer === 'yes' ? 'details' : 'skipped');
  const continueToPreview = () => {
    if (!offerStart || !offerEnd || Number(discount) < 1 || Number(discount) > 90) return;
    setStage('preview');
  };
  const toggleAudienceType = (value: string) => setAudienceTypes((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">80%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full bg-emerald-500 transition-all ${stage === 'intro' ? 'w-4/5' : stage === 'details' ? 'w-[85%]' : 'w-[90%]'}`} /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        {stage === 'intro' ? 'أضف عرضاً ترويجياً لمنتجك الجديد' : stage === 'details' ? 'تفاصيل العرض' : stage === 'preview' ? 'تعيين الخصم' : 'تم إعداد منتجك'}
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-3 md:px-6">
        {stage === 'intro' && (
          <section className="space-y-4">
            <div className="space-y-2 text-sm leading-relaxed text-foreground">
              <p>هل ترغب في تشجيع المزيد من المسافرين على حجز منتجك؟</p>
              <ul className="list-disc space-y-1 pe-5 text-muted-foreground">
                <li>أنشئ عرضاً خاصاً لجذب المسافرين الجدد وزيادة الحجوزات.</li>
                <li>حدد فترة العرض ونسبة الخصم التي تناسبك.</li>
                <li>اختر المسافرين الذين يمكنهم الاستفادة من العرض.</li>
                <li>سيظهر السعر المخفض بوضوح على صفحة منتجك.</li>
              </ul>
            </div>
            <fieldset className="space-y-2 border-t border-border pt-4">
              <legend className="text-sm font-semibold text-foreground">هل ترغب في إضافة عرض ترويجي؟</legend>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="wants-offer" checked={wantsOffer === 'yes'} onChange={() => setWantsOffer('yes')} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم، أريد إنشاء عرض ترويجي</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="wants-offer" checked={wantsOffer === 'no'} onChange={() => setWantsOffer('no')} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا، شكراً</label>
            </fieldset>
            <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={continueFromIntro}>حفظ والاستمرار</ReusableButton></div>
          </section>
        )}

        {stage === 'details' && (
          <section className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-semibold text-foreground"><span>فترة العرض</span><span className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0 text-primary" /><input aria-label="تاريخ بداية العرض" type="date" required value={offerStart} onChange={(event) => setOfferStart(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></span><span className="flex items-center gap-2"><CalendarDays size={16} className="shrink-0 text-primary" /><input aria-label="تاريخ نهاية العرض" type="date" required value={offerEnd} onChange={(event) => setOfferEnd(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></span></label>
              <label className="space-y-2 text-sm font-semibold text-foreground"><span>نسبة الخصم</span><span className="flex items-center overflow-hidden rounded-lg border border-border"><input type="number" min="1" max="90" value={discount} onChange={(event) => setDiscount(event.target.value)} className="w-full px-3 py-2 text-sm font-normal focus:outline-none" /><span className="border-r border-border bg-muted px-3 py-2 text-sm">٪</span></span></label>
            </div>

            <fieldset className="space-y-3 border-t border-border pt-4">
              <legend className="text-sm font-semibold text-foreground">حدد تواريخ الحجز والجولة المشمولة بالعرض</legend>
              <p className="text-sm text-muted-foreground">اختر الفترة التي يستطيع المسافرون خلالها الحجز، وفترة تنفيذ الجولة.</p>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm text-foreground"><span>الحجز من</span><input type="date" value={bookingStart} onChange={(event) => setBookingStart(event.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                <label className="space-y-1 text-sm text-foreground"><span>الحجز إلى</span><input type="date" value={bookingEnd} onChange={(event) => setBookingEnd(event.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                <label className="space-y-1 text-sm text-foreground"><span>موعد الجولة من</span><input type="date" value={tourStart} onChange={(event) => setTourStart(event.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></label>
                <label className="space-y-1 text-sm text-foreground"><span>موعد الجولة إلى</span><input type="date" value={tourEnd} onChange={(event) => setTourEnd(event.target.value)} className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></label>
              </div>
            </fieldset>

            <fieldset className="space-y-2 border-t border-border pt-4">
              <legend className="text-sm font-semibold text-foreground">من يمكنه الاستفادة من هذا العرض؟</legend>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="offer-audience" checked={audience === 'all'} onChange={() => setAudience('all')} className="h-4 w-4 accent-[hsl(var(--primary))]" />جميع المسافرين</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="offer-audience" checked={audience === 'selected'} onChange={() => setAudience('selected')} className="h-4 w-4 accent-[hsl(var(--primary))]" />مسافرون محددون</label>
              {audience === 'selected' && <div className="me-6 space-y-2">{[['new', 'المسافرون الجدد'], ['returning', 'المسافرون العائدون']].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={audienceTypes.includes(value)} onChange={() => toggleAudienceType(value)} className="h-4 w-4 accent-[hsl(var(--primary))]" />{label}</label>)}</div>}
            </fieldset>

            <div className="flex items-start gap-2 rounded-md border border-primary/40 px-3 py-2 text-sm leading-relaxed text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>سيتم تطبيق الخصم على الحجوزات المؤهلة خلال الفترة التي حددتها.</span></div>
            <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4"><ReusableButton type="button" variant="outline" onClick={() => setStage('intro')}>السابق</ReusableButton><ReusableButton type="button" onClick={continueToPreview}>التالي</ReusableButton></div>
          </section>
        )}

        {stage === 'preview' && (
          <section className="space-y-5">
            <div className="flex flex-wrap gap-3 text-sm"><span className="rounded-md bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">الخصم: {discount}%</span><span className="rounded-md bg-muted px-3 py-2 text-foreground">سعر العرض: {Math.round(120 * (1 - Number(discount || 0) / 100))} USD</span><span className="rounded-md bg-muted px-3 py-2 text-foreground">السعر الأصلي: 120 USD</span></div>
            <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-border bg-white shadow-md">
              <div className="relative h-40 overflow-hidden bg-muted"><img src="/imgs/true-stories5.jpg" alt="صورة الجولة" className="h-full w-full object-cover" /><span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">عرض خاص</span><button type="button" aria-label="أضف إلى المفضلة" className="absolute left-3 top-3 rounded-full bg-white/90 p-2 text-primary"><Heart size={16} /></button><span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-white"><Tag size={13} />{discount}% خصم</span></div>
              <div className="space-y-2 p-4"><h2 className="text-base font-bold text-foreground">جولة سياحية مميزة</h2><p className="text-sm text-muted-foreground">اكتشف أبرز معالم المدينة في تجربة لا تُنسى.</p><p className="text-sm"><span className="font-bold text-emerald-600">{Math.round(120 * (1 - Number(discount || 0) / 100))} USD</span><span className="me-2 text-muted-foreground line-through">120 USD</span></p><button type="button" className="w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">احجز الآن</button><button type="button" onClick={() => setStage('details')} className="w-full rounded-lg border border-primary px-3 py-2 text-sm font-semibold text-primary">تعديل العرض</button></div>
            </div>
            <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={() => alert('تم حفظ العرض الترويجي بنجاح!')}>حفظ والاستمرار</ReusableButton></div>
          </section>
        )}

        {stage === 'skipped' && <div className="space-y-4 text-center"><p className="text-sm text-muted-foreground">يمكنك إضافة عرض ترويجي لاحقاً من إعدادات المنتج.</p><ReusableButton type="button" onClick={() => alert('تم حفظ المنتج دون عرض ترويجي.')}>حفظ والاستمرار</ReusableButton><div><button type="button" onClick={() => setStage('intro')} className="text-sm font-semibold text-primary hover:underline">رجوع</button></div></div>}
      </div>
    </div>
  );
}
