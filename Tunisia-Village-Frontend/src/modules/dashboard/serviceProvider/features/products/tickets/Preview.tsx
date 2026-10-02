"use client";

import React, { useState } from 'react';
import { CalendarDays, ChevronDown, Clock3, Download, MapPin, Ticket, UserRound } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

type PreviewMode = 'mobile' | 'paper';

const ticketDetails = [
  { label: 'اسم المسافر', value: 'اسم المسافر', icon: UserRound },
  { label: 'رقم الحجز', value: 'TV-2025-01482', icon: Ticket },
  { label: 'تاريخ الجولة', value: 'الأحد، 15 يونيو 2025', icon: CalendarDays },
  { label: 'وقت الجولة', value: '10:00 صباحاً', icon: Clock3 },
  { label: 'عدد التذاكر', value: 'تذكرتان', icon: UserRound },
];

export default function Preview() {
  const [mode, setMode] = useState<PreviewMode>('mobile');
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((current) => current.includes(section) ? current.filter((item) => item !== section) : [...current, section]);
  };

  const sections = [
    { id: 'ticket', title: 'معلومات التذكرة', text: 'احتفظ بالتذكرة وأبرز رمز الدخول عند الوصول إلى نقطة الانطلاق.' },
    { id: 'meeting', title: 'معلومات التجمع والاستقبال', text: 'سيتم إرسال تفاصيل نقطة الالتقاء وبيانات التواصل إلى المسافر ضمن تأكيد الحجز.' },
    { id: 'refund', title: 'سياسة الإلغاء', text: 'تطبق سياسة الإلغاء والاسترداد التي اخترتها لهذا المنتج.' },
  ];

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">إليك معاينة تذاكرك</h1>

      <div className="mx-auto max-w-5xl space-y-5">
        <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-primary/50" role="tablist" aria-label="نوع معاينة التذكرة">
          <button type="button" role="tab" aria-selected={mode === 'paper'} onClick={() => setMode('paper')} className={`px-3 py-2.5 text-sm font-semibold transition-colors ${mode === 'paper' ? 'bg-primary text-primary-foreground' : 'bg-white text-primary hover:bg-muted'}`}>
            معاينة ورقية
          </button>
          <button type="button" role="tab" aria-selected={mode === 'mobile'} onClick={() => setMode('mobile')} className={`px-3 py-2.5 text-sm font-semibold transition-colors ${mode === 'mobile' ? 'bg-primary text-primary-foreground' : 'bg-white text-primary hover:bg-muted'}`}>
            معاينة الجوال
          </button>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">ستظهر هذه المعلومات للمسافرين في تذاكرهم.</p>
            <p className="mt-1 text-sm text-muted-foreground">تأكد من صحة بيانات التذكرة قبل المتابعة.</p>
          </div>
          <button type="button" onClick={() => window.print()} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"><Download size={16} />تحميل نسخة PDF</button>
        </div>

        <div className={mode === 'mobile' ? 'flex justify-center py-1' : 'rounded-xl border border-border bg-white p-4 md:p-6'}>
          <article className={mode === 'mobile' ? 'w-full max-w-[310px] overflow-hidden rounded-2xl border border-foreground/50 bg-white shadow-sm' : 'w-full max-w-3xl'}>
            <div className={mode === 'mobile' ? 'p-4' : 'grid gap-6 md:grid-cols-[minmax(0,1fr)_220px]'}>
              <div className={mode === 'mobile' ? '' : 'order-2 space-y-5'}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500 text-emerald-600"><Ticket size={18} /></span>
                    <div><p className="text-xs text-muted-foreground">تذكرة الجولة</p><h2 className="text-base font-bold text-primary">جولة سياحية مميزة</h2></div>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold text-primary">مؤكدة</span>
                </div>

                <div className={`grid gap-x-4 gap-y-3 ${mode === 'mobile' ? 'mt-4 grid-cols-2 border-b border-border pb-4' : 'grid-cols-2'}`}>
                  {ticketDetails.map((detail) => {
                    const Icon = detail.icon;
                    return <div key={detail.label} className="flex items-start gap-2"><Icon size={15} className="mt-0.5 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">{detail.label}</p><p className="text-sm font-medium text-foreground">{detail.value}</p></div></div>;
                  })}
                </div>

                {mode === 'paper' && <div className="space-y-2 border-t border-border pt-4"><h3 className="text-sm font-semibold text-foreground">تفاصيل التذكرة</h3><p className="text-sm leading-relaxed text-muted-foreground">يرجى الوصول إلى نقطة الالتقاء قبل موعد الجولة بعشر دقائق، وإظهار هذه التذكرة للمرشد.</p><div className="flex items-center gap-2 text-sm text-foreground"><MapPin size={15} className="text-primary" />نقطة الالتقاء: وسط المدينة</div></div>}
              </div>

              <div className={mode === 'mobile' ? 'mt-4 border-t border-dashed border-border pt-4' : 'order-1 flex flex-col items-center justify-center border-l border-dashed border-border px-5'}>
                <p className="mb-2 text-center text-xs text-muted-foreground">امسح الرمز عند الوصول</p>
                <div aria-label="رمز التذكرة" className="h-16 w-full max-w-[220px] bg-[repeating-linear-gradient(90deg,#111827_0px,#111827_3px,transparent_3px,transparent_6px,#111827_6px,#111827_8px,transparent_8px,transparent_12px)]" />
                <p className="mt-2 text-center text-xs tracking-[0.2em] text-foreground">TV 2025 01482</p>
              </div>
            </div>
            {mode === 'mobile' && <div className="space-y-2 px-4 pb-4"><button type="button" onClick={() => window.print()} className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">تحميل نسخة PDF</button><button type="button" className="w-full rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary">إظهار تفاصيل التذكرة</button></div>}
          </article>
        </div>

        {mode === 'paper' && (
          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-foreground">معلومات إضافية للمسافرين</h2>
            {sections.map((section) => {
              const isOpen = openSections.includes(section.id);
              return <div key={section.id} className="overflow-hidden rounded-lg border border-border"><button type="button" aria-expanded={isOpen} onClick={() => toggleSection(section.id)} className="flex w-full items-center justify-between gap-3 px-3 py-3 text-right text-sm font-semibold text-foreground"><span>{section.title}</span><ChevronDown size={16} className={`shrink-0 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <p className="border-t border-border bg-muted/30 px-3 py-3 text-sm leading-relaxed text-muted-foreground">{section.text}</p>}</div>;
            })}
          </section>
        )}

        <div className="flex justify-center border-t border-border pt-4"><ReusableButton type="button" onClick={() => alert('تم حفظ المعاينة والمتابعة!')}>حفظ والاستمرار</ReusableButton></div>
      </div>
    </div>
  );
}
