"use client";

import React, { useState } from 'react';
import { Lightbulb, ChevronDown, MapPin, Search, Plus, Trash2, ArrowRight } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect, { SelectOption } from '@/src/shared/components/common/Selection/ReusableSelect';

export default function Meeting() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [meetingType, setMeetingType] = useState<string>('meeting_point');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['hotel', 'sea_port']);
  const [hotelInfoChoice, setHotelInfoChoice] = useState<'radius' | 'individual'>('radius');
  
  // Step 2 Map State
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState('1km');
  const [addedRegions, setAddedRegions] = useState<string[]>(['الفيوم (Faiyum)']);
  const [isRadiusDropdownOpen, setIsRadiusDropdownOpen] = useState(false);
  const [isHotelPickerOpen, setIsHotelPickerOpen] = useState(false);
  const [individualLocations, setIndividualLocations] = useState<Array<{ name: string; category: string }>>([]);
  const [finalLocationName, setFinalLocationName] = useState('');
  const [finalPointName, setFinalPointName] = useState('');
  const [tourEndsAtMeetingPoint, setTourEndsAtMeetingPoint] = useState(true);
  const [individualCategory, setIndividualCategory] = useState('hotel');

  const meetingTypeOptions: SelectOption[] = [
    { value: 'meeting_point', label: 'نقابل جميع المسافرين في نقطة تجمع محددة' },
    { value: 'hotel_pickup', label: 'نستلم المسافرين من الفنادق أو أماكن إقامتهم' }
  ];

  const locationOptions: SelectOption[] = [
    { value: 'hotel', label: 'فندق', starred: true },
    { value: 'sea_port', label: 'ميناء بحري', starred: true },
    { value: 'airport', label: 'مطار' },
    { value: 'other', label: 'أخرى' }
  ];
  const radiusOptions = [
    { value: '1km', label: 'نصف قطر 1 كم' },
    { value: '2miles', label: 'نصف قطر 2 ميل' },
    { value: '100m', label: 'نصف قطر 100 م' }
  ];
  const handleAddRegion = () => {
    if (searchQuery.trim()) {
      setAddedRegions([...addedRegions, searchQuery.trim()]);
      setSearchQuery('');
    }
  };

  const handleRemoveRegion = (index: number) => {
    setAddedRegions(addedRegions.filter((_, i) => i !== index));
  };

  // Get current active radius label
  const activeRadiusLabel = radiusOptions.find((option) => option.value === radius)?.label || 'نصف قطر 1 كم';

  // Determine size of the animated map circle based on selected radius
  const getCircleRadius = () => {
    switch (radius) {
      case '100m': return '40px';
      case '1km': return '80px';
      case '2miles': return '130px';
      default: return '80px';
    }
  };

  const handleNextStep = () => {
    if (selectedLocations.includes('hotel')) {
      setStep(hotelInfoChoice === 'radius' ? 2 : 3);
    } else {
      alert('تم حفظ البيانات بنجاح!');
    }
  };

  return (
    <div className="min-h-full space-y-0 rounded-2xl bg-white text-right animate-in fade-in duration-300" dir="rtl">
      <div className="border-b border-border px-6 pb-3 pt-4"><div className="mx-auto flex max-w-4xl items-center gap-3" dir="ltr"><span className="text-sm font-bold text-primary">{step === 1 ? '40%' : step === 4 ? '80%' : '60%'}</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full bg-primary ${step === 1 ? 'w-2/5' : step === 4 ? 'w-4/5' : 'w-3/5'}`} /></div></div></div>
      {/* Header Breadcrumbs */}
      <div className="hidden text-lg font-bold text-gray-400 items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>ب-محتوى المنتج</span>
        <span>&gt;</span>
        <span className="text-primary">1.ب.الاجتماع والاستلام</span>
      </div>

      {step === 1 ? (
        <>
          {/* Main Title */}
          <div className="mx-auto my-5 w-fit rounded-lg bg-muted px-5 py-3 text-center">
            <h1 className="text-xl font-extrabold text-primary md:text-2xl">
              أخبرنا كيف وأين تلتقي بمسافريك
            </h1>
          </div>
          {/* Did You Know Box */}
          <div className="mx-auto flex max-w-5xl items-start gap-3 rounded-lg border border-primary/40 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center"><Lightbulb className="text-primary" size={20} /></div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-primary">هل تعلم؟</h2>
              <p className="text-sm font-medium leading-relaxed text-foreground">يرغب المسافرون في معرفة مواقع الاستلام بدقة حتى يتمكنوا من التخطيط ليومهم. إضافة نقاط لقاء واستلام محددة تساعدهم في العثور على منتجك.</p>
            </div>
          </div>
          {/* Form Content */}
          <div className="mx-auto max-w-5xl space-y-5 bg-white px-4 py-5 md:px-8">
            <div className="ml-auto w-full max-w-xl space-y-3">
              <label className="block text-base font-bold text-primary">كيف تقابل مسافريك؟</label>
              <ReusableSelect placeholder="اختر طريقة اللقاء" options={meetingTypeOptions} selectedValues={[meetingType]} onChange={(values) => setMeetingType(values[0] || 'meeting_point')} multiple={false} starredOptionSupport={false} compact identityColor />
            </div>
            <div className="ml-auto w-full max-w-xl space-y-3">
              <label className="block text-base font-bold text-primary">أين تقوم باستقبال مسافريك؟</label>
              <ReusableSelect placeholder="مكان استقبال المسافرين" options={locationOptions} selectedValues={selectedLocations} onChange={setSelectedLocations} multiple starredOptionSupport compact identityColor showSelectedTags={false} />
            </div>
            {/* Hotel pickup preferences */}
            {selectedLocations.includes('hotel') && (
              <div className="mx-auto w-full max-w-5xl space-y-4 border-t border-border pt-5 animate-in slide-in-from-top duration-300">
                <h2 className="text-lg font-bold text-foreground">هل تريد إدخال معلومات اختيار الفندق الخاص بك؟</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${hotelInfoChoice === 'radius' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
                    <input type="radio" name="hotelInfoChoice" checked={hotelInfoChoice === 'radius'} onChange={() => { setHotelInfoChoice('radius'); setStep(2); }} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
                    <span className="text-base font-medium leading-relaxed text-foreground">أريد تحديد منطقة عامة للفنادق التي سأستقبل منها، سأختار دائرة نصف قطرها في مدينة أو حي أو عنوان محدد وأستقبل من داخل تلك الدائرة</span>
                  </label>
                  <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${hotelInfoChoice === 'individual' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted'}`}>
                    <input type="radio" name="hotelInfoChoice" checked={hotelInfoChoice === 'individual'} onChange={() => { setHotelInfoChoice('individual'); setStep(3); }} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
                    <span className="text-base font-medium leading-relaxed text-foreground">أريد إضافة المواقع واحدة تلو الأخرى، وسأضيف الفنادق بشكل فردي.</span>
                  </label>
                </div>
              </div>
            )}
            {/* Actions */}
            {!selectedLocations.includes('hotel') && <div className="flex justify-start border-t border-border pt-4"><ReusableButton onClick={handleNextStep}>حفظ والاستمرار</ReusableButton></div>}
          </div>
        </>
      ) : step === 2 ? (
        <>
          {/* Step 2: Map radius config */}
          <div className="space-y-6 max-w-5xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600"
                title="رجوع"
              >
                <ArrowRight size={20} />
              </button>
              <h1 className="text-xl md:text-2xl font-black text-gray-800">
                تحديد المنطقة الجغرافية لاستلامك من الفندق:
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Config Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-6 bg-white border border-gray-150 rounded-3xl p-6 shadow-xs h-fit">
                {/* Radius Select */}
                <div className="space-y-4">
                  <label className="block text-lg font-black text-gray-700">تحديد النطاق (نصف القطر):</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsRadiusDropdownOpen(!isRadiusDropdownOpen)}
                      className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 flex items-center justify-between hover:border-gray-300 transition-colors"
                    >
                      <span>{activeRadiusLabel}</span>
                      <ChevronDown size={18} className="text-gray-400" />
                    </button>
                    {isRadiusDropdownOpen && (
                      <div className="absolute right-0 left-0 mt-1 z-30 bg-white border border-gray-150 rounded-xl shadow-lg overflow-hidden">
                        {radiusOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setRadius(opt.value);
                              setIsRadiusDropdownOpen(false);
                            }}
                            className="w-full text-right p-3 hover:bg-gray-50 text-lg font-bold text-gray-700"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Region Search Input */}
                <div className="space-y-4">
                  <label className="block text-lg font-black text-gray-700">قم بالبحث عن المنطقة:</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن مدينة، حي، أو عنوان..."
                        className="w-full py-3 pr-4 pl-10 bg-white border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right"
                      />
                      <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                    </div>
                    <ReusableButton variant="outline" onClick={handleAddRegion} className="!py-3 !px-4 shrink-0">
                      <Plus size={18} />
                    </ReusableButton>
                  </div>
                </div>

                {/* Added Regions List */}
                {addedRegions.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <span className="block text-xs font-black text-gray-400">المناطق المحددة الحالية:</span>
                    <div className="space-y-4 max-h-40 overflow-y-auto pr-1">
                      {addedRegions.map((region, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 px-3 bg-gray-55 border border-gray-100 rounded-xl text-xs font-bold text-gray-700">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            <span>{region} ({activeRadiusLabel})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveRegion(idx)}
                            className="p-1 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Save and Submit */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  <ReusableButton variant="secondary" onClick={() => alert('تم حفظ المناطق المحددة بنجاح!')}>
                    الحفظ و الإستمرار
                  </ReusableButton>
                  <ReusableButton variant="outline" onClick={() => setStep(1)}>
                    إلغاء
                  </ReusableButton>
                </div>
              </div>

              {/* Right Column: Premium Mock Map (7 cols) */}
              <div className="lg:col-span-7 bg-primary/5 border border-primary/20 rounded-3xl shadow-xs overflow-hidden relative min-h-[380px] lg:min-h-[460px] flex items-center justify-center">
                {/* Mock Map Background Canvas */}
                <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/30.84,29.31,10,0/800x600?access_token=mock")' }}>
                  {/* Simple illustrative fallback pattern if URL doesn't load */}
                  <div className="w-full h-full bg-[#f4f7fe] relative overflow-hidden flex items-center justify-center">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-20">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                    
                    {/* Simulated city markers and roads */}
                    <div className="absolute top-20 right-32 text-xs font-black text-gray-400 tracking-wider">Cairo (القاهرة)</div>
                    <div className="absolute bottom-24 left-24 text-xs font-black text-gray-400 tracking-wider font-mono">Faiyum (الفيوم)</div>
                    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M-50,150 C200,100 400,300 900,200" fill="none" stroke="#cbd5e1" strokeWidth="6" />
                      <path d="M100,-50 C150,200 300,300 400,600" fill="none" stroke="#cbd5e1" strokeWidth="4" />
                    </svg>
                  </div>
                </div>

                {/* Map Interface Overlay */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-gray-150 text-[10px] font-bold text-gray-500 shadow-sm z-10 flex gap-2">
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded-md">خريطة</span>
                  <span className="text-gray-400">قمر صناعي</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-1.5 px-3 rounded-lg border border-gray-150 text-[9px] font-bold text-gray-400 shadow-sm z-10">
                  Google Map Mockup
                </div>

                {/* Dynamic Radius Circle Overlay */}
                <div 
                  className="absolute z-20 flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    width: getCircleRadius(),
                    height: getCircleRadius(),
                    borderRadius: '50%',
                    backgroundColor: 'hsla(var(--primary) / 0.12)',
                    border: '2px solid hsla(var(--primary) / 0.4)'
                  }}
                >
                  <div className="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md animate-bounce relative z-30" />
                  <div className="absolute w-2 h-2 bg-primary/30 rounded-full animate-ping" />
                  
                  {/* Tooltip */}
                  <div className="absolute -bottom-8 bg-slate-900 text-white text-[10px] font-black py-0.5 px-2 rounded-md shadow-md whitespace-nowrap">
                    {addedRegions[0] || 'منطقة الإستقبال'} : {activeRadiusLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : step === 3 ? (
        <section className="mx-auto max-w-5xl space-y-6 px-4 py-6 md:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border p-2 text-primary hover:bg-muted" aria-label="رجوع"><ArrowRight size={20} /></button>
            <div>
              <h1 className="text-xl font-bold text-primary">إضافة المواقع واحداً تلو الآخر</h1>
              <p className="mt-1 text-sm text-muted-foreground">أضف الفنادق ومواقع الاستقبال التي تريد استقبال المسافرين منها.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="space-y-4 rounded-xl border border-border bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-foreground">الفنادق</h2>
                <button type="button" onClick={() => setIsHotelPickerOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-bold text-primary hover:bg-primary/5"><Plus size={16} />اختر الفنادق</button>
              </div>
              {individualLocations.some((place) => place.category === 'hotel') ? <ul className="space-y-2">{individualLocations.filter((place) => place.category === 'hotel').map((place) => <li key={`${place.category}-${place.name}`} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm"><span>{place.name}</span><button type="button" onClick={() => setIndividualLocations(individualLocations.filter((item) => item.name !== place.name))} className="text-muted-foreground hover:text-destructive" aria-label={`حذف ${place.name}`}><Trash2 size={16} /></button></li>)}</ul> : <p className="text-sm text-muted-foreground">لم تتم إضافة فنادق بعد.</p>}
              <button type="button" onClick={() => { setIndividualCategory('hotel'); setFinalLocationName(''); setStep(4); }} className="inline-flex items-center gap-2 text-sm font-bold text-primary"><Plus size={16} />أضف موقعاً على الخريطة</button>
            </section>

            {[
              { id: 'sea_port', label: 'الموانئ البحرية' },
              { id: 'airport', label: 'المطارات' },
              { id: 'other', label: 'مواقع أخرى' },
            ].map((category) => (
              <section key={category.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white p-5">
                <div><h2 className="text-lg font-bold text-foreground">{category.label}</h2><p className="mt-1 text-sm text-muted-foreground">أضف نقطة استقبال على الخريطة.</p>{individualLocations.filter((place) => place.category === category.id).map((place) => <span key={place.name} className="mt-2 block text-sm text-foreground"><MapPin size={14} className="me-1 inline text-primary" />{place.name}</span>)}</div>
                <button type="button" onClick={() => { setIndividualCategory(category.id); setFinalLocationName(''); setStep(4); }} className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-bold text-primary hover:bg-primary/5"><Plus size={16} />أضف موقعاً</button>
              </section>
            ))}
          </div>

          <section className="space-y-5 border-t border-border pt-5">
            <fieldset className="space-y-3">
              <legend className="text-base font-bold text-primary">هل تنتهي هذه الجولة عند نقطة/نقاط اللقاء؟</legend>
              <div className="flex flex-wrap gap-5">
                <label className="inline-flex cursor-pointer items-center gap-2 text-base text-foreground"><input type="radio" name="tourEndsAtMeetingPoint" checked={tourEndsAtMeetingPoint} onChange={() => setTourEndsAtMeetingPoint(true)} className="h-4 w-4 accent-[hsl(var(--primary))]" />نعم</label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-base text-foreground"><input type="radio" name="tourEndsAtMeetingPoint" checked={!tourEndsAtMeetingPoint} onChange={() => setTourEndsAtMeetingPoint(false)} className="h-4 w-4 accent-[hsl(var(--primary))]" />لا</label>
              </div>
            </fieldset>

            {!tourEndsAtMeetingPoint && (
              <div className="space-y-4 rounded-xl border border-border p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-primary">نقطة النهاية</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{finalPointName || 'ابحث عن نقطة النهاية على الخريطة.'}</p>
                  </div>
                </div>
                <label className="block space-y-2">
                  <span className="text-base font-medium text-foreground">ابحث عن نقطة النهاية</span>
                  <span className="relative block"><Search className="absolute right-3 top-3.5 text-muted-foreground" size={18} /><input value={finalLocationName} onChange={(event) => setFinalLocationName(event.target.value)} placeholder="ابحث عن فندق أو شارع أو عنوان" className="w-full rounded-lg border border-border py-3 pe-10 ps-4 text-base focus:outline-none focus:ring-2 focus:ring-primary" /></span>
                </label>
                <p className="text-sm text-muted-foreground">ابحث عن موقعك أو حدده على الخريطة، ويمكنك تحريك المؤشر لتعديل الموقع.</p>
                <button type="button" onClick={() => setStep(4)} className="inline-flex items-center gap-2 rounded-lg border border-primary px-3 py-2 text-sm font-bold text-primary hover:bg-primary/5"><Plus size={17} />أضف نقطة نهائية</button>
                <div className="relative h-64 overflow-hidden rounded-lg border border-border bg-muted">
                  <iframe title="خريطة نقطة النهاية" src="https://www.google.com/maps?q=Faiyum,Egypt&output=embed" className="h-full w-full border-0" loading="lazy" />
                  <MapPin className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full fill-primary text-primary" size={32} />
                </div>
              </div>
            )}
          </section>

          <div className="flex justify-start border-t border-border pt-4"><ReusableButton onClick={() => alert('تم حفظ البيانات بنجاح!')}>حفظ والاستمرار</ReusableButton></div>

          {isHotelPickerOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 p-4" role="dialog" aria-modal="true" aria-labelledby="hotel-picker-title">
              <div className="w-full max-w-xl space-y-5 rounded-xl bg-white p-6 shadow-2xl">
                <div className="text-center"><h2 id="hotel-picker-title" className="text-xl font-bold text-foreground">إدارة قائمة الفنادق</h2><p className="mt-1 text-sm text-muted-foreground">اختر الفنادق التي تستقبل منها المسافرين.</p></div>
                <div className="space-y-2">{['فندق النيل', 'فندق القاهرة', 'فندق الأهرامات', 'فندق المعادي', 'فندق الجيزة', 'فندق وسط البلد'].map((hotel) => <label key={hotel} className="flex cursor-pointer items-center justify-between rounded-lg border border-border px-4 py-3 text-base hover:bg-muted"><span>{hotel}</span><input type="checkbox" checked={individualLocations.some((place) => place.name === hotel)} onChange={() => setIndividualLocations((current) => current.some((place) => place.name === hotel) ? current.filter((place) => place.name !== hotel) : [...current, { name: hotel, category: 'hotel' }])} className="h-4 w-4 accent-[hsl(var(--primary))]" /></label>)}</div>
                <div className="flex justify-end gap-3"><ReusableButton variant="outline" onClick={() => setIsHotelPickerOpen(false)}>إلغاء</ReusableButton><ReusableButton onClick={() => setIsHotelPickerOpen(false)}>تم</ReusableButton></div>
              </div>
            </div>
          )}
        </section>
      ) : (
        <section className="mx-auto max-w-5xl space-y-5 px-4 py-6 md:px-8">
          <div className="flex items-center gap-3"><button type="button" onClick={() => setStep(3)} className="rounded-lg border border-border p-2 text-primary hover:bg-muted" aria-label="رجوع"><ArrowRight size={20} /></button><h1 className="text-xl font-bold text-primary">نقطة الاستقبال النهائية</h1></div>
          <label className="block space-y-2"><span className="text-base font-bold text-foreground">ابحث عن نقطة الاستقبال</span><span className="relative block"><Search className="absolute right-3 top-3.5 text-muted-foreground" size={18} /><input value={finalLocationName} onChange={(event) => setFinalLocationName(event.target.value)} placeholder="ابحث عن فندق أو شارع أو عنوان" className="w-full rounded-lg border border-border py-3 pe-10 ps-4 text-base focus:outline-none focus:ring-2 focus:ring-primary" /></span></label>
          <p className="text-sm text-muted-foreground">حرّك الخريطة للتحقق من الموقع، ثم أدخل اسماً واضحاً لنقطة الاستقبال.</p>
          <div className="relative h-[420px] overflow-hidden rounded-xl border border-border bg-muted"><iframe title="خريطة نقطة الاستقبال في الفيوم" src="https://www.google.com/maps?q=Faiyum,Egypt&output=embed" className="h-full w-full border-0" loading="lazy" /><MapPin className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full fill-primary text-primary" size={34} /></div>
          <div className="flex justify-start"><ReusableButton onClick={() => { if (finalLocationName.trim()) setFinalPointName(finalLocationName.trim()); setStep(3); }}>حفظ والاستمرار</ReusableButton></div>
        </section>
      )}
    </div>
  );
}




