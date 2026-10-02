"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Headphones, PenLine, Plus, UserRound } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

type EvidenceType = 'personal' | 'audio' | 'written';
type EvidenceByLanguage = Record<string, Record<EvidenceType, boolean>>;

const availableLanguages = ['الفرنسية', 'الإسبانية', 'الألمانية', 'الإيطالية', 'التركية'];

export default function LanguageProvided() {
  const [hasEvidence, setHasEvidence] = useState<'yes' | 'no'>('yes');
  const [languages, setLanguages] = useState(['العربية', 'الإنجليزية']);
  const [evidence, setEvidence] = useState<EvidenceByLanguage>({
    العربية: { personal: true, audio: false, written: false },
    الإنجليزية: { personal: false, audio: true, written: false },
  });
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const isEvidenceDisabled = hasEvidence === 'no';

  const toggleEvidence = (language: string, type: EvidenceType) => {
    setEvidence((current) => ({
      ...current,
      [language]: { ...current[language], [type]: !current[language]?.[type] },
    }));
  };

  const addLanguage = (language: string) => {
    if (languages.includes(language)) return;
    setLanguages((current) => [...current, language]);
    setEvidence((current) => ({
      ...current,
      [language]: { personal: false, audio: false, written: false },
    }));
    setIsLanguageMenuOpen(false);
  };

  return (
    <div className="min-h-full space-y-6 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 border-b border-border px-4 pb-3" dir="ltr">
        <span className="text-sm font-bold text-primary">40%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 rounded-full bg-primary" /></div>
      </div>

      <div className="mx-auto w-fit bg-muted px-6 py-3 text-center">
        <h1 className="text-xl font-bold text-primary md:text-2xl">أخبرنا عن الأدلة المقدمة</h1>
      </div>

      <div className="mx-auto max-w-5xl space-y-6">
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-primary">هل تقدمون أدلة شخصية أو صوتية أو مكتوبة؟</legend>
          <div className="flex flex-col gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input type="radio" name="has-evidence" checked={hasEvidence === 'yes'} onChange={() => setHasEvidence('yes')} className="h-4 w-4 accent-[hsl(var(--primary))]" />
              نعم
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input type="radio" name="has-evidence" checked={hasEvidence === 'no'} onChange={() => { setHasEvidence('no'); setIsLanguageMenuOpen(false); }} className="h-4 w-4 accent-[hsl(var(--primary))]" />
              لا
            </label>
          </div>
        </fieldset>

        <fieldset disabled={isEvidenceDisabled} className={`space-y-4 transition-opacity ${isEvidenceDisabled ? 'opacity-50' : ''}`}>
          <legend className="mb-3 text-base font-semibold text-primary">ما نوع الدليل المتضمن؟</legend>

          <div className="overflow-x-auto rounded-xl border border-border">
            <div className="min-w-[480px]">
              <div className="grid grid-cols-[minmax(120px,1fr)_repeat(3,minmax(90px,120px))] items-center border-b border-border bg-white px-3 py-3 text-sm font-semibold text-primary">
                <span className="flex items-center gap-2"><Globe size={15} />اللغة</span>
                <span className="flex items-center justify-center gap-1.5"><UserRound size={15} />شخصي</span>
                <span className="flex items-center justify-center gap-1.5"><Headphones size={15} />صوت</span>
                <span className="flex items-center justify-center gap-1.5"><PenLine size={15} />كتابة</span>
              </div>

              {languages.map((language, index) => (
                <div key={language} className={`grid grid-cols-[minmax(120px,1fr)_repeat(3,minmax(90px,120px))] items-center px-3 py-2.5 text-sm ${index % 2 === 0 ? 'bg-muted/60' : 'bg-white'}`}>
                  <span className="font-medium text-foreground">{language}</span>
                  {(['personal', 'audio', 'written'] as EvidenceType[]).map((type) => (
                    <span key={type} className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={evidence[language]?.[type] ?? false}
                        onChange={() => toggleEvidence(language, type)}
                        aria-label={`${language} - ${type}`}
                        className="h-4 w-4 cursor-pointer rounded border-border accent-[hsl(var(--primary))]"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-start">
            <button
              type="button"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-96"
            >
              <span className="flex items-center gap-2"><Plus size={17} className="text-primary" />إضافة لغات أخرى</span>
              {isLanguageMenuOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-white shadow-xl sm:w-96">
                {availableLanguages.filter((language) => !languages.includes(language)).map((language) => (
                  <button key={language} type="button" onClick={() => addLanguage(language)} className="flex w-full items-center justify-between border-b border-border/60 px-4 py-3 text-sm text-foreground transition-colors last:border-0 hover:bg-muted">
                    {language}<Plus size={15} className="text-primary" />
                  </button>
                ))}
                {availableLanguages.every((language) => languages.includes(language)) && <p className="px-4 py-3 text-sm text-muted-foreground">تمت إضافة جميع اللغات المتاحة.</p>}
              </div>
            )}
          </div>
        </fieldset>

        <div className="flex justify-start border-t border-border pt-4">
          <ReusableButton onClick={() => alert('تم حفظ البيانات بنجاح!')}>حفظ والاستمرار</ReusableButton>
        </div>
      </div>
    </div>
  );
}
