"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info, Pencil, Plus, Trash2 } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

type ItemType = 'included' | 'excluded';
type PageView = 'setup' | 'form' | 'table';

interface TourItem {
  id: number;
  type: ItemType;
  category: string;
  title: string;
  description: string;
}

const categories = ['الوجبات', 'الإقامة', 'المواصلات', 'الأنشطة والتذاكر', 'أخرى'];

export default function InclusionsExclusions() {
  const [view, setView] = useState<PageView>('setup');
  const [items, setItems] = useState<TourItem[]>([]);
  const [formType, setFormType] = useState<ItemType>('included');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [returnView, setReturnView] = useState<PageView>('setup');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<ItemType, boolean>>({ included: false, excluded: false });

  const openAddForm = (type: ItemType) => {
    setFormType(type);
    setEditingId(null);
    setCategory('');
    setTitle('');
    setDescription('');
    setReturnView(view);
    setView('form');
  };

  const openEditForm = (item: TourItem) => {
    setFormType(item.type);
    setEditingId(item.id);
    setCategory(item.category);
    setTitle(item.title);
    setDescription(item.description);
    setReturnView(view);
    setView('form');
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const nextItem: TourItem = {
      id: editingId ?? Date.now(),
      type: formType,
      category,
      title: title.trim(),
      description: description.trim(),
    };

    setItems((current) => editingId === null
      ? [...current, nextItem]
      : current.map((item) => item.id === editingId ? nextItem : item));
    if (returnView === 'setup') setExpandedGroups((current) => ({ ...current, [formType]: true }));
    setView(returnView);
  };

  const confirmDelete = () => {
    if (deleteId !== null) setItems((current) => current.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  const typeLabel = formType === 'included' ? 'ما تتضمنه الجولة' : 'ما لا تتضمنه الجولة';

  const renderGroup = (type: ItemType, label: string) => {
    const groupItems = items.filter((item) => item.type === type);
    const isExpanded = expandedGroups[type];

    return (
      <section key={type} className="overflow-hidden rounded-xl border border-border bg-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <button type="button" aria-expanded={isExpanded} onClick={() => setExpandedGroups((current) => ({ ...current, [type]: !current[type] }))} className="flex min-w-0 flex-1 items-center justify-between gap-3 text-right">
            <span className="font-semibold text-primary">{label}<span className="ms-2 text-xs font-normal text-muted-foreground">({groupItems.length})</span></span>
            {isExpanded ? <ChevronUp size={17} className="shrink-0 text-muted-foreground" /> : <ChevronDown size={17} className="shrink-0 text-muted-foreground" />}
          </button>
          <button type="button" onClick={() => openAddForm(type)} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary hover:underline"><Plus size={16} />إضافة</button>
        </div>

        {isExpanded && (
          <div className="space-y-2 border-t border-border bg-muted/20 p-3">
            {groupItems.length === 0 ? (
              <p className="rounded-lg bg-white px-3 py-4 text-center text-sm text-muted-foreground">لا توجد عناصر مضافة في هذا القسم بعد.</p>
            ) : groupItems.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border/70 bg-white px-3 py-3">
                <div className="min-w-[100px] flex-1"><p className="text-xs text-muted-foreground">{item.category}</p><p className="mt-0.5 font-semibold text-foreground">{item.title}</p>{item.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>}</div>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" onClick={() => openEditForm(item)} className="rounded-md p-2 text-primary hover:bg-primary/10" aria-label={`تعديل ${item.title}`}><Pencil size={16} /></button>
                  <button type="button" onClick={() => setDeleteId(item.id)} className="rounded-md p-2 text-destructive hover:bg-destructive/10" aria-label={`حذف ${item.title}`}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-full space-y-6 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 border-b border-border px-4 pb-3" dir="ltr">
        <span className="text-sm font-bold text-primary">40%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 rounded-full bg-primary" /></div>
      </div>

      {view === 'setup' && (
        <section className="mx-auto max-w-5xl space-y-5">
          <div className="flex items-start gap-3 rounded-lg border border-primary/40 bg-white px-4 py-3 text-sm leading-relaxed text-primary">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>وضّح للمسافرين ما الذي يتضمنه سعر الجولة وما الذي لا يتضمنه، حتى يعرفوا ما يمكنهم توقعه.</p>
          </div>

          <div className="space-y-3">
            {renderGroup('included', 'ما هي الأشياء التي تتضمنها الجولة؟')}
            {renderGroup('excluded', 'ما هي الأشياء التي لا تتضمنها الجولة؟')}
          </div>

          <div className="flex justify-center border-t border-border pt-4">
            <ReusableButton onClick={() => setView('table')}>حفظ والاستمرار</ReusableButton>
          </div>
        </section>
      )}

      {view === 'table' && (
        <section className="mx-auto max-w-5xl space-y-5">
          <div className="mx-auto w-fit bg-muted px-5 py-2 text-center"><h1 className="text-lg font-bold text-primary">إضافة ما تتضمنه الجولة</h1></div>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[700px] border-collapse text-right text-sm">
              <thead><tr className="bg-muted font-semibold text-primary"><th className="px-4 py-3">الفئة</th><th className="px-4 py-3">العنوان</th><th className="px-4 py-3">الوصف</th><th className="px-3 py-3 text-center">تعديل</th><th className="px-3 py-3 text-center">حذف</th></tr></thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? 'bg-muted/60' : 'bg-white'} border-t border-border/60`}>
                    <td className="px-4 py-3 font-medium text-foreground"><span className={`me-2 inline-block h-2 w-2 rounded-full ${item.type === 'included' ? 'bg-primary' : 'bg-muted-foreground'}`} />{item.category}</td>
                    <td className="px-4 py-3 text-foreground">{item.title}</td>
                    <td className="max-w-sm px-4 py-3 text-muted-foreground">{item.description || '—'}</td>
                    <td className="px-3 py-3 text-center"><button type="button" onClick={() => openEditForm(item)} className="rounded-md p-1.5 text-primary hover:bg-primary/10" aria-label={`تعديل ${item.title}`}><Pencil size={16} /></button></td>
                    <td className="px-3 py-3 text-center"><button type="button" onClick={() => setDeleteId(item.id)} className="rounded-md p-1.5 text-destructive hover:bg-destructive/10" aria-label={`حذف ${item.title}`}><Trash2 size={16} /></button></td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">لم تتم إضافة أي عناصر بعد.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="flex justify-start">
            <div className="relative flex flex-wrap gap-4">
              <button type="button" onClick={() => openAddForm('included')} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"><Plus size={16} />إضافة ما تتضمنه</button>
              <button type="button" onClick={() => openAddForm('excluded')} className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"><Plus size={16} />إضافة ما لا تتضمنه</button>
            </div>
          </div>

          <div className="flex justify-center border-t border-border pt-4"><ReusableButton onClick={() => alert('تم حفظ البيانات بنجاح!')}>حفظ والاستمرار</ReusableButton></div>
        </section>
      )}

      {view === 'form' && (
        <section className="mx-auto max-w-5xl space-y-5">
          <div className="mx-auto w-fit bg-muted px-5 py-2 text-center"><h1 className="text-lg font-bold text-primary">{editingId === null ? 'إضافة' : 'تعديل'} {typeLabel}</h1></div>
          <div className="flex items-start gap-3 rounded-lg border border-primary/40 px-4 py-3 text-sm leading-relaxed text-primary"><Info size={18} className="mt-0.5 shrink-0" /><p>اختر الفئة وأضف وصفاً واضحاً ليسهل على المسافرين معرفة تفاصيل الجولة.</p></div>

          <form onSubmit={handleSave} className="space-y-5">
            <label className="block space-y-2"><span className="text-sm font-semibold text-primary">اختر الفئة:</span><select required value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"><option value="" disabled>اختر الفئة</option>{categories.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
            <label className="block space-y-2"><span className="text-sm font-semibold text-primary">العنوان:</span><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="أدخل اسم العنصر" className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" /></label>
            <label className="block space-y-2"><span className="text-sm font-semibold text-primary">أضف وصفاً:</span><textarea required value={description} onChange={(event) => setDescription(event.target.value)} maxLength={1000} rows={4} placeholder="اكتب تفاصيل العنصر" className="w-full resize-y rounded-lg border border-border bg-white p-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" /><span className="block text-left text-xs text-muted-foreground">{1000 - description.length} حرفاً متبقياً</span></label>
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-between">
              <ReusableButton type="button" variant="outline" onClick={() => setView(returnView)}>إلغاء</ReusableButton>
              <ReusableButton type="submit">{editingId === null ? 'إضافة' : 'تعديل'}</ReusableButton>
            </div>
          </form>
        </section>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-labelledby="delete-item-title">
          <div className="w-full max-w-md space-y-5 rounded-2xl border border-border bg-white p-6 text-center shadow-2xl">
            <h2 id="delete-item-title" className="text-lg font-bold text-destructive">حذف العنصر</h2>
            <p className="text-sm leading-relaxed text-foreground">هل أنت متأكد أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex justify-center gap-3"><ReusableButton variant="outline" onClick={() => setDeleteId(null)}>لا</ReusableButton><ReusableButton onClick={confirmDelete}>نعم، احذف</ReusableButton></div>
          </div>
        </div>
      )}
    </div>
  );
}
