"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

export default function TicketBuilder() {
  const [ticketType, setTicketType] = useState('individual');
  const [ticketLimit, setTicketLimit] = useState('unlimited');
  const [maxTickets, setMaxTickets] = useState('10');

  const handleSave = () => {
    if (ticketLimit === 'limited' && (!maxTickets || Number(maxTickets) < 1)) return;
    alert('تم حفظ إعدادات التذاكر بنجاح!');
  };

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        دعنا ننشئ تذاكرك
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 px-3 py-3 md:px-6">
        <div className="flex items-start gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm leading-relaxed text-primary">
          <Info size={16} className="mt-0.5 shrink-0" />
          <p>اختر إعدادات التذاكر المناسبة لطريقة تقديم منتجك. يمكنك تعديل هذه الاختيارات لاحقاً.</p>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-foreground">اختر نوع التذكرة</legend>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="radio" name="ticket-type" value="individual" checked={ticketType === 'individual'} onChange={() => setTicketType('individual')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span className="flex flex-wrap items-center gap-2">تذكرة فردية لكل مسافر<span className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">الأكثر شيوعاً</span></span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="radio" name="ticket-type" value="group" checked={ticketType === 'group'} onChange={() => setTicketType('group')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>تذكرة واحدة للمجموعة أو الحجز بالكامل</span>
          </label>
          {ticketType === 'group' && <p className="me-6 text-sm text-muted-foreground">يشتري المسافر تذكرة واحدة تغطي جميع أفراد مجموعته.</p>}
        </fieldset>

        <fieldset className="space-y-2 border-t border-border pt-4">
          <legend className="text-sm font-semibold text-foreground">كم عدد التذاكر التي تريد إتاحتها لكل حجز؟</legend>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="radio" name="ticket-limit" value="unlimited" checked={ticketLimit === 'unlimited'} onChange={() => setTicketLimit('unlimited')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span className="flex flex-wrap items-center gap-2">عدد غير محدود<span className="rounded-full border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">الأكثر شيوعاً</span></span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
            <input type="radio" name="ticket-limit" value="limited" checked={ticketLimit === 'limited'} onChange={() => setTicketLimit('limited')} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />
            <span>تحديد عدد معين من التذاكر</span>
          </label>
          {ticketLimit === 'limited' && (
            <label className="me-6 flex max-w-sm items-center gap-2 text-sm text-foreground">
              <span>الحد الأقصى للتذاكر لكل حجز</span>
              <input type="number" min="1" value={maxTickets} onChange={(event) => setMaxTickets(event.target.value)} className="w-24 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>
          )}
        </fieldset>

        <div className="flex justify-center border-t border-border pt-4">
          <ReusableButton type="button" onClick={handleSave}>حفظ والاستمرار</ReusableButton>
        </div>
      </div>
    </div>
  );
}
