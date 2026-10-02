"use client";

import React, { useState } from 'react';
import { Clock3, Info, Pencil, Plus, Trash2, X } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect from '@/src/shared/components/common/Selection/ReusableSelect';

type Stage = 'pricing' | 'schedule' | 'list' | 'price-form' | 'option-form';
interface PriceSchedule {
  id: number;
  name: string;
  price: string;
  currency: string;
  capacity: string;
  days: string[];
}
interface PricingOption {
  id: number;
  name: string;
  categories: string[];
  canChangePrice: boolean;
  calculation: string;
}

const scheduleOptions = [
  { label: 'جدول أسبوعي', value: 'weekly' },
  { label: 'جدول يومي', value: 'daily' },
  { label: 'جدول حسب التاريخ', value: 'date' },
];
const pricingOptions = [
  { label: 'لكل مسافر', value: 'traveler' },
  { label: 'للمجموعة بالكامل', value: 'group' },
  { label: 'لكل مركبة', value: 'vehicle' },
];
const weekdays = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

export default function PricingSchedules() {
  const [stage, setStage] = useState<Stage>('pricing');
  const [showTimingPrompt, setShowTimingPrompt] = useState(false);
  const [pricingUnit, setPricingUnit] = useState('traveler');
  const [scheduleType, setScheduleType] = useState('weekly');
  const [startsAt, setStartsAt] = useState('');
  const [availabilityRule, setAvailabilityRule] = useState('always');
  const [schedules, setSchedules] = useState<PriceSchedule[]>([]);
  const [pricingAttributes, setPricingAttributes] = useState<PricingOption[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [capacity, setCapacity] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>(weekdays);
  const [attributeName, setAttributeName] = useState('');
  const [attributeCategories, setAttributeCategories] = useState<string[]>([]);
  const [attributePriceChanges, setAttributePriceChanges] = useState<'yes' | 'no'>('yes');
  const [attributeCalculation, setAttributeCalculation] = useState('fixed');

  const openNewSchedule = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setCurrency('USD');
    setCapacity('');
    setSelectedDays(weekdays);
    setStage('price-form');
  };

  const editSchedule = (item: PriceSchedule) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCurrency(item.currency);
    setCapacity(item.capacity);
    setSelectedDays(item.days);
    setStage('price-form');
  };

  const saveSchedule = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !price.trim()) return;
    const item = { id: editingId ?? Date.now(), name: name.trim(), price, currency, capacity, days: selectedDays };
    setSchedules((current) => editingId === null ? [...current, item] : current.map((row) => row.id === editingId ? item : row));
    setStage('list');
  };

  const toggleDay = (day: string) => setSelectedDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day]);

  const proceedFromSchedule = () => setShowTimingPrompt(true);
  const finishTimingPrompt = () => {
    setShowTimingPrompt(false);
    setStage('list');
  };

  const openAttributeForm = () => {
    setAttributeName('');
    setAttributeCategories([]);
    setAttributePriceChanges('yes');
    setAttributeCalculation('fixed');
    setStage('option-form');
  };

  const saveAttribute = (event: React.FormEvent) => {
    event.preventDefault();
    if (!attributeName.trim()) return;
    setPricingAttributes((current) => [...current, {
      id: Date.now(),
      name: attributeName.trim(),
      categories: attributeCategories,
      canChangePrice: attributePriceChanges === 'yes',
      calculation: attributeCalculation,
    }]);
    setStage('list');
  };

  const progress = stage === 'pricing' ? '60%' : stage === 'schedule' ? '70%' : '80%';

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">{progress}</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full bg-emerald-500 transition-all ${stage === 'pricing' ? 'w-3/5' : stage === 'schedule' ? 'w-[70%]' : 'w-4/5'}`} /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        {stage === 'list' ? 'إنشاء جدول التسعير' : stage === 'price-form' ? (editingId === null ? 'إضافة الأسعار' : 'تعديل الأسعار') : stage === 'option-form' ? 'إضافة سمات خيار أخرى' : 'التسعير والجداول الزمنية'}
      </h1>

      <div className="mx-auto max-w-5xl space-y-5 rounded-xl px-3 py-4 md:px-6">
        {stage === 'pricing' && (
          <section className="space-y-4">
            <div className="max-w-xl space-y-2">
              <label className="block text-sm font-semibold text-foreground">كيف تود تسعير منتجاتك؟</label>
              <ReusableSelect placeholder="اختر طريقة التسعير" options={pricingOptions} selectedValues={[pricingUnit]} onChange={(values) => setPricingUnit(values[0] || 'traveler')} multiple={false} starredOptionSupport={false} compact identityColor />
            </div>
            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-foreground">ما هي مدة صلاحية السعر؟</legend>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="price-validity" defaultChecked className="h-4 w-4 accent-[hsl(var(--primary))]" />السعر ثابت طوال العام</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="price-validity" className="h-4 w-4 accent-[hsl(var(--primary))]" />يتغير السعر حسب الموسم والتاريخ</label>
            </fieldset>
            <div className="flex items-start gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm leading-relaxed text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>يمكنك إعداد أكثر من جدول تسعير لتحديد أسعار مختلفة حسب الموسم أو التوافر.</span></div>
          </section>
        )}

        {stage === 'schedule' && (
          <section className="space-y-4">
            <div className="max-w-xl space-y-2">
              <label className="block text-sm font-semibold text-foreground">نوع جدولك</label>
              <ReusableSelect placeholder="اختر نوع الجدول" options={scheduleOptions} selectedValues={[scheduleType]} onChange={(values) => setScheduleType(values[0] || 'weekly')} multiple={false} starredOptionSupport={false} compact identityColor />
            </div>
            <div className="max-w-xl space-y-2">
              <label htmlFor="schedule-start" className="block text-sm font-semibold text-foreground">تاريخ بدء التوافر</label>
              <input id="schedule-start" type="date" value={startsAt} onChange={(event) => setStartsAt(event.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-foreground">حدد الأيام التي تكون فيها منتجاتك متاحة للحجز</legend>
              {[
                ['always', 'هذا الجدول متاح طوال العام، ويمكن حجزه في جميع الأيام'],
                ['selected-days', 'هذا الجدول متاح في أيام محددة من الأسبوع'],
                ['date-range', 'هذا الجدول متاح خلال فترة زمنية محددة'],
              ].map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-start gap-2 text-sm leading-relaxed text-foreground">
                  <input type="radio" name="availability-rule" checked={availabilityRule === value} onChange={() => setAvailabilityRule(value)} className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]" />{label}
                </label>
              ))}
            </fieldset>
            <div className="flex items-start gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>يمكنك إضافة جداول تسعير متعددة وتعديلها في أي وقت.</span></div>
          </section>
        )}

        {stage === 'list' && (
          <section className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between gap-3"><strong className="text-sm text-primary">{scheduleType === 'weekly' ? 'جدول أسبوعي' : scheduleType === 'daily' ? 'جدول يومي' : 'جدول حسب التاريخ'}</strong><button type="button" onClick={() => setStage('schedule')} className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><Pencil size={15} />تعديل</button></div>
              <div className="grid gap-2 text-sm text-foreground sm:grid-cols-2">
                <p>طريقة التسعير: {pricingOptions.find((option) => option.value === pricingUnit)?.label}</p>
                <p>تاريخ البدء: {startsAt || 'غير محدد'}</p>
                <p>التوافر: {availabilityRule === 'always' ? 'طوال العام' : availabilityRule === 'selected-days' ? 'أيام محددة من الأسبوع' : 'فترة زمنية محددة'}</p>
              </div>
            </div>
            {schedules.length > 0 && <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-right text-sm"><thead className="bg-muted text-primary"><tr><th className="px-3 py-2">جدول الأسعار</th><th className="px-3 py-2">السعر</th><th className="px-3 py-2">السعة</th><th className="px-3 py-2">الأيام</th><th className="px-3 py-2">إجراءات</th></tr></thead><tbody>{schedules.map((item, index) => <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/40'}><td className="px-3 py-2">{item.name}</td><td className="px-3 py-2">{item.price} {item.currency}</td><td className="px-3 py-2">{item.capacity || '—'}</td><td className="px-3 py-2">{item.days.join('، ') || '—'}</td><td className="px-3 py-2"><div className="flex gap-3"><button type="button" aria-label="تعديل الجدول" onClick={() => editSchedule(item)} className="text-primary"><Pencil size={16} /></button><button type="button" aria-label="حذف الجدول" onClick={() => setDeleteId(item.id)} className="text-destructive"><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div>}
            {pricingAttributes.length > 0 && <div className="space-y-2">{pricingAttributes.map((attribute) => <div key={attribute.id} className="rounded-lg border border-border bg-muted/30 p-3"><div className="flex items-center justify-between"><strong className="text-sm text-primary">{attribute.name}</strong><span className="text-xs text-muted-foreground">{attribute.canChangePrice ? 'السعر قابل للتغيير' : 'السعر ثابت'}</span></div><p className="mt-1 text-sm text-foreground">الفئات: {attribute.categories.join('، ') || 'جميع الفئات'}{attribute.canChangePrice ? ` · طريقة الحساب: ${attribute.calculation === 'traveler' ? 'لكل مسافر' : attribute.calculation === 'day' ? 'لكل يوم' : 'سعر ثابت'}` : ''}</p></div>)}</div>}
            <button type="button" onClick={openNewSchedule} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-primary hover:bg-muted"><Plus size={17} />إضافة جدول تسعير</button>
            <div className="space-y-2">
              <div className="flex items-start gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>أضف فترات أو قواعد تسعير مختلفة لمنتجاتك.</span></div>
              <button type="button" onClick={() => setStage('schedule')} className="flex w-full items-center justify-between rounded-lg border border-primary/40 px-3 py-3 text-sm font-semibold text-primary"><span>إضافة فترة أخرى</span><Plus size={17} /></button>
              <button type="button" onClick={openAttributeForm} className="flex w-full items-center justify-between rounded-lg border border-primary/40 px-3 py-3 text-sm font-semibold text-primary"><span>إضافة سمات خيار أخرى</span><Plus size={17} /></button>
            </div>
          </section>
        )}

        {stage === 'price-form' && (
          <form onSubmit={saveSchedule} className="space-y-4">
            <div className="flex items-start gap-2 rounded-lg border border-primary/40 px-3 py-2 text-sm leading-relaxed text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>أدخل أسعار جميع الفئات المتاحة، ويمكنك تحديثها لاحقاً.</span></div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5 text-sm font-semibold text-foreground"><span>اسم جدول الأسعار</span><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="مثال: السعر الأساسي" className="w-full rounded-lg border border-border px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
              <label className="space-y-1.5 text-sm font-semibold text-foreground"><span>الحد الأقصى للمسافرين لكل حجز</span><input type="number" min="1" value={capacity} onChange={(event) => setCapacity(event.target.value)} placeholder="مثال: 25" className="w-full rounded-lg border border-border px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-primary" /></label>
              <label className="space-y-1.5 text-sm font-semibold text-foreground"><span>سعر المسافر</span><div className="flex overflow-hidden rounded-lg border border-border"><input required type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="أدخل السعر" className="min-w-0 flex-1 px-3 py-2 font-normal focus:outline-none" /><select value={currency} onChange={(event) => setCurrency(event.target.value)} className="border-r border-border bg-muted px-3 text-sm"><option>USD</option><option>TND</option><option>EUR</option><option>EGP</option></select></div></label>
              <div className="space-y-2"><span className="block text-sm font-semibold text-foreground">الأيام المتاحة لهذا السعر</span><div className="flex flex-wrap gap-2">{weekdays.map((day) => <button key={day} type="button" onClick={() => toggleDay(day)} aria-pressed={selectedDays.includes(day)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${selectedDays.includes(day) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{day}</button>)}</div></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-primary"><Info size={16} className="mt-0.5 shrink-0" /><span>أضف أوقات الانطلاق التي يتوفر فيها هذا السعر.</span></div>
              <div className="flex items-center gap-2"><Clock3 size={16} className="text-primary" /><label htmlFor="departure-time" className="text-sm font-semibold text-foreground">وقت الانطلاق</label><input id="departure-time" type="time" className="rounded-md border border-border px-2 py-1.5 text-sm" /></div>
              <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-primary"><Plus size={16} />إضافة وقت انطلاق</button>
            </div>
            <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4"><ReusableButton type="button" variant="outline" onClick={() => setStage('list')}>إلغاء</ReusableButton><ReusableButton type="submit">{editingId === null ? 'حفظ' : 'تحديث'}</ReusableButton></div>
          </form>
        )}

        {stage === 'option-form' && (
          <form onSubmit={saveAttribute} className="space-y-4">
            <label className="block max-w-xl space-y-1.5 text-sm font-semibold text-foreground">
              <span>قم بتسمية هذه الخاصية</span>
              <input required value={attributeName} onChange={(event) => setAttributeName(event.target.value)} placeholder="اكتب اسم الخاصية" className="w-full rounded-lg border border-border bg-white px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-primary" />
            </label>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-foreground">حدد الفئات التالية:</legend>
              {['بالغ', 'طفل', 'رضيع'].map((category) => (
                <label key={category} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={attributeCategories.includes(category)} onChange={() => setAttributeCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])} className="h-4 w-4 accent-[hsl(var(--primary))]" />{category}
                </label>
              ))}
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold text-foreground">هل يمكن تغيير سعر هذا المنتج؟</legend>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="attribute-price-change" checked={attributePriceChanges === 'yes'} onChange={() => setAttributePriceChanges('yes')} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم</label>
              <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="attribute-price-change" checked={attributePriceChanges === 'no'} onChange={() => setAttributePriceChanges('no')} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا</label>
            </fieldset>

            {attributePriceChanges === 'yes' && <label className="block max-w-xl space-y-1.5 text-sm font-semibold text-foreground"><span>طريقة حساب هذا السعر</span><ReusableSelect placeholder="اختر طريقة الحساب" options={[{ label: 'سعر ثابت', value: 'fixed' }, { label: 'لكل مسافر', value: 'traveler' }, { label: 'لكل يوم', value: 'day' }]} selectedValues={[attributeCalculation]} onChange={(values) => setAttributeCalculation(values[0] || 'fixed')} multiple={false} starredOptionSupport={false} compact identityColor /></label>}

            <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-4"><ReusableButton type="button" variant="outline" onClick={() => setStage('list')}>السابق</ReusableButton><ReusableButton type="submit">التالي</ReusableButton></div>
          </form>
        )}
      </div>

      {(stage === 'pricing' || stage === 'schedule' || stage === 'list') && (
        <div className="flex justify-center gap-3">
          {stage === 'schedule' && <ReusableButton type="button" variant="outline" onClick={() => setStage('pricing')}>السابق</ReusableButton>}
          {stage === 'pricing' && <ReusableButton type="button" onClick={() => setStage('schedule')}>حفظ والاستمرار</ReusableButton>}
          {stage === 'schedule' && <ReusableButton type="button" onClick={proceedFromSchedule}>التالي</ReusableButton>}
          {stage === 'list' && <ReusableButton type="button" onClick={() => alert('تم حفظ جدول التسعير بنجاح!')}>حفظ والاستمرار</ReusableButton>}
        </div>
      )}

      {showTimingPrompt && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="timing-prompt-title"><div className="w-full max-w-xl space-y-4 rounded-xl bg-white p-5 shadow-xl md:p-7"><div className="text-center"><Clock3 size={52} className="mx-auto mb-3 text-amber-500" /><h2 id="timing-prompt-title" className="text-lg font-bold text-primary">ساعدنا على تحسين خيارات التوقيت لدينا</h2></div><div className="space-y-2 text-sm leading-relaxed text-muted-foreground"><p>يرجى مشاركة أي تفاصيل تساعد المسافرين على معرفة مواعيد توفر المنتج.</p><p>يمكنك توضيح الأوقات المرنة أو المواعيد التي تتطلب حجزاً مسبقاً.</p><p>يمكنك إضافة خيارات تسعير أخرى في الخطوة التالية.</p></div><div className="flex flex-wrap justify-center gap-3"><ReusableButton type="button" variant="outline" onClick={finishTimingPrompt}>لا</ReusableButton><ReusableButton type="button" onClick={() => { setShowTimingPrompt(false); openAttributeForm(); }}>نعم، الاستمرار</ReusableButton></div></div></div>}

      {deleteId !== null && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="delete-schedule-title"><div className="w-full max-w-md space-y-5 rounded-xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 id="delete-schedule-title" className="text-lg font-bold text-destructive">حذف جدول الأسعار</h2><button type="button" onClick={() => setDeleteId(null)} aria-label="إغلاق"><X size={18} /></button></div><p className="text-sm text-foreground">هل أنت متأكد من حذف هذا الجدول؟</p><div className="flex justify-end gap-3"><ReusableButton type="button" variant="outline" onClick={() => setDeleteId(null)}>إلغاء</ReusableButton><ReusableButton type="button" onClick={() => { setSchedules((current) => current.filter((item) => item.id !== deleteId)); setDeleteId(null); }}>حذف</ReusableButton></div></div></div>}
    </div>
  );
}
