"use client";

import React, { useState } from 'react';
import { Info, Plus } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

type BinaryAnswer = 'yes' | 'no' | '';
interface AccessibilityQuestion {
  id: number;
  text: string;
  answer: BinaryAnswer;
}

const initialAccessibilityQuestions: AccessibilityQuestion[] = [
  { id: 1, text: 'هل يتطلب مسار الجولة صعود السلالم؟', answer: '' },
  { id: 2, text: 'هل توجد مسافة طويلة للمشي خلال الجولة؟', answer: '' },
  { id: 3, text: 'هل تتوفر أماكن للجلوس أثناء الجولة؟', answer: '' },
  { id: 4, text: 'هل يمكن الوصول إلى الموقع باستخدام كرسي متحرك؟', answer: '' },
  { id: 5, text: 'هل تتوفر دورات مياه مهيأة؟', answer: '' },
  { id: 6, text: 'هل يوجد مصعد في أماكن الزيارة أو الإقامة؟', answer: '' },
  { id: 7, text: 'هل يحتاج المسافرون إلى مساعدة أثناء التنقل؟', answer: '' },
  { id: 8, text: 'هل توجد قيود جسدية أخرى ينبغي معرفتها؟', answer: '' },
];

const defaultHealthConditions = [
  'هل توجد حالات صحية ينبغي أن يعرفها المرشد؟',
  'هل لدى المسافر حساسية أو احتياجات صحية خاصة؟',
  'هل يحتاج المسافر إلى مساعدة صحية أثناء الجولة؟',
];

export default function TravelerInfo() {
  const [accessibilityQuestions, setAccessibilityQuestions] = useState(initialAccessibilityQuestions);
  const [isAddingAccessQuestion, setIsAddingAccessQuestion] = useState(false);
  const [newAccessQuestion, setNewAccessQuestion] = useState('');
  const [healthConditions, setHealthConditions] = useState(defaultHealthConditions);
  const [selectedHealthConditions, setSelectedHealthConditions] = useState<string[]>([]);
  const [isAddingHealthCondition, setIsAddingHealthCondition] = useState(false);
  const [newHealthCondition, setNewHealthCondition] = useState('');
  const [difficulty, setDifficulty] = useState('متوسط');
  const [hasEmergencyContact, setHasEmergencyContact] = useState(true);
  const [countryCode, setCountryCode] = useState('+20');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const updateAccessibilityAnswer = (id: number, answer: Exclude<BinaryAnswer, ''>) => {
    setAccessibilityQuestions((current) => current.map((question) => question.id === id ? { ...question, answer } : question));
  };

  const addAccessibilityQuestion = (event: React.FormEvent) => {
    event.preventDefault();
    const text = newAccessQuestion.trim();
    if (!text) return;
    setAccessibilityQuestions((current) => [...current, { id: Date.now(), text, answer: '' }]);
    setNewAccessQuestion('');
    setIsAddingAccessQuestion(false);
  };

  const addHealthCondition = (event: React.FormEvent) => {
    event.preventDefault();
    const condition = newHealthCondition.trim();
    if (!condition) return;
    setHealthConditions((current) => current.includes(condition) ? current : [...current, condition]);
    setSelectedHealthConditions((current) => current.includes(condition) ? current : [...current, condition]);
    setNewHealthCondition('');
    setIsAddingHealthCondition(false);
  };

  const toggleSelection = (value: string, current: string[], setCurrent: React.Dispatch<React.SetStateAction<string[]>>) => {
    setCurrent(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const handleSubmit = () => {
    if (hasEmergencyContact && !emergencyPhone.trim()) return;
    alert('تم حفظ البيانات بنجاح!');
  };

  return (
    <div className="min-h-full space-y-4 rounded-2xl bg-white px-4 py-4 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">40%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 rounded-full bg-emerald-500" /></div>
      </div>

      <div className="mx-auto flex max-w-5xl items-start gap-2 rounded-lg border border-primary/40 bg-white px-4 py-3 text-sm leading-relaxed text-primary">
        <Info size={17} className="mt-0.5 shrink-0" />
        <p>أخبرنا بالمعلومات التي يحتاج المسافرون إلى معرفتها قبل حجز جولتك.</p>
      </div>

      <div className="mx-auto max-w-5xl space-y-4">
        <section className="space-y-2">
          <h1 className="text-base font-bold text-primary">إمكانية الوصول</h1>
          <div className="overflow-x-auto rounded-lg border border-border">
            <div className="min-w-[460px]">
              <div className="grid grid-cols-[minmax(0,1fr)_70px_70px] items-center border-b border-border bg-muted px-3 py-2 text-sm font-semibold text-primary">
                <span>متطلبات الوصول</span><span className="text-center">نعم</span><span className="text-center">لا</span>
              </div>
              {accessibilityQuestions.map((question, index) => (
                <div key={question.id} className={`grid grid-cols-[minmax(0,1fr)_70px_70px] items-center px-3 py-1.5 text-sm ${index % 2 === 0 ? 'bg-muted/50' : 'bg-white'}`}>
                  <span className="pe-2 text-foreground">{question.text}</span>
                  {(['yes', 'no'] as const).map((answer) => (
                    <span key={answer} className="flex justify-center"><input type="radio" name={`access-${question.id}`} checked={question.answer === answer} onChange={() => updateAccessibilityAnswer(question.id, answer)} aria-label={`${question.text}: ${answer === 'yes' ? 'نعم' : 'لا'}`} className="h-4 w-4 cursor-pointer accent-[hsl(var(--primary))]" /></span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => setIsAddingAccessQuestion((open) => !open)} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"><Plus size={16} />أضف متطلباً آخر</button>
          {isAddingAccessQuestion && <form onSubmit={addAccessibilityQuestion} className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-3"><input autoFocus value={newAccessQuestion} onChange={(event) => setNewAccessQuestion(event.target.value)} placeholder="اكتب متطلب الوصول" className="min-w-[220px] flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">إضافة</button><button type="button" onClick={() => setIsAddingAccessQuestion(false)} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">إلغاء</button></form>}
        </section>

        <section className="space-y-2 border-t border-border pt-3">
          <h2 className="text-base font-bold text-primary">القيود الصحية</h2>
          <p className="text-sm text-muted-foreground">أخبرنا بأي معلومات صحية مهمة تخص المسافرين.</p>
          <div className="space-y-1">
            {healthConditions.map((condition, index) => (
              <label key={condition} className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm ${index % 2 === 0 ? 'bg-muted/50' : 'bg-white'}`}>
                <input type="checkbox" checked={selectedHealthConditions.includes(condition)} onChange={() => toggleSelection(condition, selectedHealthConditions, setSelectedHealthConditions)} className="h-4 w-4 accent-[hsl(var(--primary))]" />{condition}
              </label>
            ))}
          </div>
          <button type="button" onClick={() => setIsAddingHealthCondition((open) => !open)} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"><Plus size={16} />أضف حالة صحية</button>
          {isAddingHealthCondition && <form onSubmit={addHealthCondition} className="flex flex-wrap gap-2 rounded-lg border border-border bg-muted/30 p-3"><input autoFocus value={newHealthCondition} onChange={(event) => setNewHealthCondition(event.target.value)} placeholder="اكتب الحالة الصحية" className="min-w-[220px] flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /><button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">إضافة</button><button type="button" onClick={() => setIsAddingHealthCondition(false)} className="rounded-lg border border-border bg-white px-4 py-2 text-sm">إلغاء</button></form>}
        </section>

        <section className="space-y-2 border-t border-border pt-3">
          <h2 className="text-base font-bold text-primary">ما مستوى الصعوبة البدنية للجولة؟</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {['سهل', 'متوسط', 'صعب'].map((option) => (
              <label key={option} className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input type="radio" name="tour-difficulty" value={option} checked={difficulty === option} onChange={() => setDifficulty(option)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                {option}
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center gap-2"><Info size={16} className="text-primary" /><h2 className="text-base font-bold text-primary">رقم الطوارئ الخاص بك</h2></div>
          <p className="text-sm text-muted-foreground">أضف رقم تواصل يمكن للمسافرين استخدامه عند الحاجة.</p>
          <fieldset className="space-y-3">
            <div className="flex flex-wrap gap-5">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="has-emergency-contact" checked={hasEmergencyContact} onChange={() => setHasEmergencyContact(true)} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم</label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="has-emergency-contact" checked={!hasEmergencyContact} onChange={() => setHasEmergencyContact(false)} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا</label>
            </div>
            <div className="flex max-w-xl gap-2">
              <select aria-label="رمز الدولة" disabled={!hasEmergencyContact} value={countryCode} onChange={(event) => setCountryCode(event.target.value)} className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"><option value="+20">🇪🇬 +20</option><option value="+216">🇹🇳 +216</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option></select>
              <input type="tel" disabled={!hasEmergencyContact} value={emergencyPhone} onChange={(event) => setEmergencyPhone(event.target.value)} placeholder="أدخل رقم الهاتف" className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted disabled:opacity-60" />
            </div>
            {hasEmergencyContact && !emergencyPhone.trim() && <p className="text-xs text-muted-foreground">يرجى إدخال رقم طوارئ صالح.</p>}
          </fieldset>
        </section>

        <div className="flex justify-center border-t border-border pt-3"><ReusableButton type="button" onClick={handleSubmit}>حفظ والاستمرار</ReusableButton></div>
      </div>
    </div>
  );
}
