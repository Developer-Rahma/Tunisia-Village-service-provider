"use client";

import React, { useState } from 'react';
import { Sun, Plus, ChevronDown, ChevronUp, Trash2, X, Star, Utensils, Home, HelpCircle, Search } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';

interface Attraction {
  name: string;
  description: string;
  duration: number; // in minutes
  passBy: boolean;
  admission: 'yes' | 'no' | 'free';
}

interface Activity {
  destination: string;
  details: string;
}

interface Day {
  id: number;
  title: string;
  attractions: Attraction[];
  activities: Activity[];
  meals: string[];
  accommodations: string[];
}

export default function TourDetails() {
  // Mock initial days
  const [days, setDays] = useState<Day[]>([
    {
      id: 1,
      title: 'مصر - الفيوم - الشلالات',
      attractions: [
        {
          name: 'شلالات وادي الريان',
          description: 'الاستمتاع بالمناظر الطبيعية والتقاط الصور التذكارية بجانب الشلالات الرائعة.',
          duration: 120,
          passBy: false,
          admission: 'free'
        }
      ],
      activities: [],
      meals: ['غداء ريفي تقليدي'],
      accommodations: ['مخيم وادي الريان']
    },
    {
      id: 2,
      title: 'رحلة جبل المدورة والبحيرة السحرية',
      attractions: [],
      activities: [],
      meals: [],
      accommodations: []
    }
  ]);

  // UI States
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });
  
  // Modals States
  const [activeDayId, setActiveDayId] = useState<number | null>(null);
  
  // Attraction Modal State
  const [isAttractionModalOpen, setIsAttractionModalOpen] = useState(false);
  const [attractionName, setAttractionName] = useState('');
  const [attractionDesc, setAttractionDesc] = useState('');
  const [durationValue, setDurationValue] = useState(120);
  const [durationUnit, setDurationUnit] = useState<'minutes' | 'hours'>('minutes');
  const [passBy, setPassBy] = useState(false);
  const [admission, setAdmission] = useState<'yes' | 'no' | 'free'>('yes');

  // Meal Modal State
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [mealType, setMealType] = useState('غداء');
  const [mealDetails, setMealDetails] = useState('');

  // Accommodation Modal State
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [accommodationName, setAccommodationName] = useState('');
  const [accommodationType, setAccommodationType] = useState('فندق');

  // Activity destination and details dialogs
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [isActivityDetailsModalOpen, setIsActivityDetailsModalOpen] = useState(false);
  const [activityDestination, setActivityDestination] = useState('');
  const [activitySummary, setActivitySummary] = useState('');
  const [activityDetails, setActivityDetails] = useState('');

  // Accordion Toggle
  const toggleDay = (id: number) => {
    setExpandedDays(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllDays = () => {
    const allExpanded = days.every(d => expandedDays[d.id]);
    const newState: Record<number, boolean> = {};
    days.forEach(d => {
      newState[d.id] = !allExpanded;
    });
    setExpandedDays(newState);
  };

  // Add/Remove Days
  const handleAddDay = () => {
    const newId = days.length > 0 ? Math.max(...days.map(d => d.id)) + 1 : 1;
    const newDay: Day = {
      id: newId,
      title: '',
      attractions: [],
      activities: [],
      meals: [],
      accommodations: []
    };
    setDays([...days, newDay]);
    setExpandedDays(prev => ({ ...prev, [newId]: true }));
  };

  const handleRemoveDay = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا اليوم بالكامل؟')) {
      setDays(days.filter(d => d.id !== id));
    }
  };

  const handleDayTitleChange = (id: number, value: string) => {
    setDays(days.map(d => d.id === id ? { ...d, title: value } : d));
  };

  // Attraction Add Actions
  const openAttractionModal = (dayId: number) => {
    setActiveDayId(dayId);
    setAttractionName('');
    setAttractionDesc('');
    setDurationValue(120);
    setDurationUnit('minutes');
    setPassBy(false);
    setAdmission('yes');
    setIsAttractionModalOpen(true);
  };

  const handleAddAttractionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attractionName.trim()) return;

    const durationInMinutes = durationUnit === 'hours' ? durationValue * 60 : durationValue;

    const newAttraction: Attraction = {
      name: attractionName,
      description: attractionDesc,
      duration: durationInMinutes,
      passBy,
      admission
    };

    setDays(days.map(d => {
      if (d.id === activeDayId) {
        return {
          ...d,
          attractions: [...d.attractions, newAttraction]
        };
      }
      return d;
    }));

    setIsAttractionModalOpen(false);
  };

  const handleRemoveAttraction = (dayId: number, index: number) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          attractions: d.attractions.filter((_, idx) => idx !== index)
        };
      }
      return d;
    }));
  };

  const openDestinationModal = (dayId: number) => {
    setActiveDayId(dayId);
    setActivityDestination('');
    setActivitySummary('');
    setActivityDetails('');
    setIsDestinationModalOpen(true);
  };

  const handleDestinationSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!activityDestination.trim()) return;
    setIsDestinationModalOpen(false);
    setIsActivityDetailsModalOpen(true);
  };

  const saveActivity = (details: string) => {
    if (activeDayId === null || !activityDestination.trim()) return;
    setDays((currentDays) => currentDays.map((day) => day.id === activeDayId
      ? { ...day, activities: [...day.activities, { destination: activityDestination.trim(), details }] }
      : day));
    setIsDestinationModalOpen(false);
    setIsActivityDetailsModalOpen(false);
  };

  const handleActivityDetailsSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveActivity([activitySummary.trim(), activityDetails.trim()].filter(Boolean).join('\n\n'));
  };

  const handleSkipActivityDetails = () => saveActivity(activitySummary.trim());

  const handleRemoveActivity = (dayId: number, index: number) => {
    setDays((currentDays) => currentDays.map((day) => day.id === dayId
      ? { ...day, activities: day.activities.filter((_, activityIndex) => activityIndex !== index) }
      : day));
  };

  // Meal Add Actions
  const openMealModal = (dayId: number) => {
    setActiveDayId(dayId);
    setMealType('غداء');
    setMealDetails('');
    setIsMealModalOpen(true);
  };

  const handleAddMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mealText = mealDetails.trim() ? `${mealType} (${mealDetails})` : mealType;
    setDays(days.map(d => {
      if (d.id === activeDayId) {
        return {
          ...d,
          meals: [...d.meals, mealText]
        };
      }
      return d;
    }));
    setIsMealModalOpen(false);
  };

  const handleRemoveMeal = (dayId: number, index: number) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          meals: d.meals.filter((_, idx) => idx !== index)
        };
      }
      return d;
    }));
  };

  // Accommodation Add Actions
  const openAccommodationModal = (dayId: number) => {
    setActiveDayId(dayId);
    setAccommodationName('');
    setAccommodationType('فندق');
    setIsAccommodationModalOpen(true);
  };

  const handleAddAccommodationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accommodationName.trim()) return;
    const accText = `${accommodationType}: ${accommodationName}`;
    setDays(days.map(d => {
      if (d.id === activeDayId) {
        return {
          ...d,
          accommodations: [...d.accommodations, accText]
        };
      }
      return d;
    }));
    setIsAccommodationModalOpen(false);
  };

  const handleRemoveAccommodation = (dayId: number, index: number) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          accommodations: d.accommodations.filter((_, idx) => idx !== index)
        };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300 relative" dir="rtl">
      <div className="flex max-w-4xl items-center gap-3 border-b border-border px-4 pb-3 pt-2" dir="ltr">
        <span className="text-xs font-bold text-primary">40%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-2/5 rounded-full bg-primary" /></div>
      </div>
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>ب-محتوى المنتج</span>
        <span>&gt;</span>
        <span className="text-primary">2.ب.تفاصيل الجولة</span>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-gray-800">أخبرنا عن جولتك</h1>
          <p className="text-xs text-gray-400 font-semibold leading-relaxed">
            صف ما سيراه المسافرون كل يوم، وما هي الوجبات المتضمنة.
          </p>
        </div>
        <button
          onClick={toggleAllDays}
          className="text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2.5 rounded-xl border border-primary/20 transition-colors"
        >
          ضغط تفاصيل كل الأيام
        </button>
      </div>

      {/* Accordion Days List */}
      <div className="space-y-6 max-w-4xl">
        {days.map((day, index) => {
          const isExpanded = expandedDays[day.id];
          return (
            <div key={day.id} className="border border-border rounded-3xl bg-white shadow-xs overflow-hidden transition-all duration-300">
              {/* Accordion Trigger */}
              <div
                onClick={() => toggleDay(day.id)}
                className="p-5 px-6 bg-slate-50/30 border-b border-slate-50 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-2xs">
                    <Sun size={20} className="fill-primary/10" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block font-black text-gray-800 text-[16px]">
                      اليوم {index + 1 === 1 ? 'الأول' : index + 1 === 2 ? 'الثاني' : index + 1 === 3 ? 'الثالث' : index + 1 === 4 ? 'الرابع' : `${index + 1}`}
                    </span>
                    {day.title && <span className="block text-xs font-bold text-gray-400">{day.title}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleRemoveDay(day.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="حذف اليوم"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleDay(day.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-6 md:p-8 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Day Title input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700">-أعط يومك عنواناً</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleDayTitleChange(day.id, e.target.value)}
                      placeholder="على سبيل المثال: مصر - الفيوم - الشلالات"
                      className="w-full py-3.5 pr-4 pl-10 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-850 text-right shadow-2xs hover:border-gray-300 transition-colors"
                    />
                  </div>

                  {/* Program sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
                    {/* Section 1: Attractions / Program */}
                    <div className="space-y-4 border-l md:border-l border-dashed border-gray-150 pl-0 md:pl-6 last:border-l-0">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                          ⭐ برنامج الرحلة
                        </span>
                      </div>

                      {/* Attractions list */}
                      <div className="space-y-2">
                        {day.attractions.map((attr, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-2xl relative group">
                            <button
                              onClick={() => handleRemoveAttraction(day.id, idx)}
                              className="absolute top-2 left-2 p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                            <span className="block font-black text-xs text-primary mb-1">{attr.name}</span>
                            <p className="text-[10px] text-gray-400 font-bold leading-normal mb-1.5">{attr.description}</p>
                            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black">
                              <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-md">
                                {attr.duration} دقيقة
                              </span>
                              {attr.passBy && (
                                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md">
                                  مرور سريع
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => openAttractionModal(day.id)}
                        className="w-full py-3 border-2 border-dashed border-primary/20 rounded-2xl text-xs font-black text-primary hover:bg-primary/10/20 hover:border-primary/30 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>أضف عامل جذب</span>
                      </button>
                    </div>

                    {/* Section 2: Activities and visits */}
                    <div className="space-y-4 border-l md:border-l border-dashed border-gray-150 pl-0 md:pl-6 last:border-l-0">
                      <span className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                        <Star size={15} className="text-primary" /> الأنشطة والزيارات
                      </span>
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={`${activity.destination}-${activityIndex}`} className="group relative rounded-xl border border-border bg-muted/50 p-3">
                            <button type="button" onClick={() => handleRemoveActivity(day.id, activityIndex)} className="absolute left-2 top-2 rounded-md p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-white hover:text-destructive group-hover:opacity-100" aria-label={`حذف ${activity.destination}`}>
                              <X size={13} />
                            </button>
                            <span className="block pe-6 text-sm font-bold text-primary">{activity.destination}</span>
                            {activity.details && <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{activity.details}</p>}
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => openDestinationModal(day.id)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-primary/30 py-3 text-xs font-black text-primary transition-colors hover:bg-primary/5">
                        <Plus size={14} /> أضف وجهة
                      </button>
                    </div>

                    {/* Section 2: Food and drinks */}
                    <div className="space-y-4 border-l md:border-l border-dashed border-gray-150 pl-0 md:pl-6 last:border-l-0">
                      <span className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                        <Utensils size={16} className="text-gray-500" /> الطعام والشراب
                      </span>

                      {/* Meals list */}
                      <div className="space-y-2">
                        {day.meals.map((meal, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-2xl relative group flex items-center justify-between">
                            <span className="font-black text-xs text-gray-700">{meal}</span>
                            <button
                              onClick={() => handleRemoveMeal(day.id, idx)}
                              className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => openMealModal(day.id)}
                        className="w-full py-3 border-2 border-dashed border-primary/20 rounded-2xl text-xs font-black text-primary hover:bg-primary/10/20 hover:border-primary/30 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>أضف وجبة</span>
                      </button>
                    </div>

                    {/* Section 3: Accommodation */}
                    <div className="space-y-4">
                      <span className="font-black text-gray-800 text-sm flex items-center gap-1.5">
                        <Home size={16} className="text-gray-500" /> الإقامة
                      </span>

                      {/* Accommodations list */}
                      <div className="space-y-2">
                        {day.accommodations.map((acc, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-2xl relative group flex items-center justify-between">
                            <span className="font-black text-xs text-gray-700">{acc}</span>
                            <button
                              onClick={() => handleRemoveAccommodation(day.id, idx)}
                              className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => openAccommodationModal(day.id)}
                        className="w-full py-3 border-2 border-dashed border-primary/20 rounded-2xl text-xs font-black text-primary hover:bg-primary/10/20 hover:border-primary/30 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>إضافة سكن</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleAddDay}
          className="w-full sm:w-fit py-3 px-6 border border-[hsl(var(--primary))] rounded-2xl text-xs font-black text-primary hover:bg-primary/10/30 transition-all flex items-center justify-center gap-1.5"
        >
          <Plus size={14} />
          <span>أضف يوم جديد</span>
        </button>

        <ReusableButton variant="secondary" onClick={() => alert('تم حفظ تفاصيل الجولة بنجاح!')}>
          الحفظ و الإستمرار
        </ReusableButton>
      </div>

      {/* Add destination dialog */}
      {isDestinationModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-labelledby="destination-modal-title">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 id="destination-modal-title" className="text-lg font-bold text-foreground">إضافة وجهة</h2>
              <button type="button" onClick={() => setIsDestinationModalOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="إغلاق"><X size={19} /></button>
            </div>
            <form onSubmit={handleDestinationSubmit} className="space-y-4 p-5">
              <div className="space-y-2">
                <label htmlFor="activity-destination" className="block text-sm font-bold text-foreground">اختر وجهة</label>
                <div className="relative">
                  <input id="activity-destination" autoFocus required value={activityDestination} onChange={(event) => setActivityDestination(event.target.value)} placeholder="ابحث عن مكان أو اكتب اسم الوجهة" className="w-full rounded-xl border border-border bg-white py-3 pe-10 ps-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  <Search size={17} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">اكتب اسم المكان الذي ستزوره خلال هذا اليوم.</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="activity-summary" className="block text-sm font-bold text-foreground">وصف مختصر للنشاط (اختياري)</label>
                <textarea id="activity-summary" value={activitySummary} onChange={(event) => setActivitySummary(event.target.value)} maxLength={300} rows={3} placeholder="أضف ملاحظة قصيرة عن الزيارة" className="w-full resize-y rounded-xl border border-border bg-white p-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <p className="text-left text-xs text-muted-foreground">{300 - activitySummary.length} حرفاً متبقياً</p>
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
                <ReusableButton type="button" variant="outline" onClick={handleSkipActivityDetails}>لا، شكراً</ReusableButton>
                <ReusableButton type="submit">نعم، أضف التفاصيل</ReusableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity details dialog */}
      {isActivityDetailsModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-labelledby="activity-details-title">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div><h2 id="activity-details-title" className="text-lg font-bold text-foreground">تفاصيل النشاط</h2><p className="mt-1 text-sm text-muted-foreground">{activityDestination}</p></div>
              <button type="button" onClick={() => setIsActivityDetailsModalOpen(false)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="إغلاق"><X size={19} /></button>
            </div>
            <form onSubmit={handleActivityDetailsSubmit} className="space-y-4 p-5">
              <div className="space-y-2">
                <label htmlFor="activity-details" className="block text-sm font-bold text-foreground">صف ما سيشاهده المسافرون ويفعلونه في هذا النشاط.</label>
                <textarea id="activity-details" autoFocus value={activityDetails} onChange={(event) => setActivityDetails(event.target.value)} maxLength={1000} rows={5} placeholder="اكتب تفاصيل النشاط هنا" className="w-full resize-y rounded-xl border border-border bg-white p-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                <p className="text-left text-xs text-muted-foreground">{1000 - activityDetails.length} حرفاً متبقياً</p>
              </div>
              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
                <ReusableButton type="button" variant="outline" onClick={handleSkipActivityDetails}>لا، شكراً</ReusableButton>
                <ReusableButton type="submit">نعم، احفظ النشاط</ReusableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ATTRACTION MODAL (Screen 5) */}
      {isAttractionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 px-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-[17px] font-black text-gray-800">إضافة عامل جذب</h3>
              <button
                onClick={() => setIsAttractionModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleAddAttractionSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              {/* Attraction Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">إختر عامل جذب</label>
                <div className="relative">
                  <input
                    type="text"
                    value={attractionName}
                    onChange={(e) => setAttractionName(e.target.value)}
                    placeholder="على سبيل المثال: برج إيفيل، باريس..."
                    required
                    className="w-full py-3 pr-4 pl-10 bg-white border border-gray-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right"
                  />
                  <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                </div>
                <span className="block text-[10px] text-gray-400 font-bold">الموقع الجغرافي مطلوب</span>
              </div>

              {/* Attraction Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">
                  صف ما سوف يراه المسافرون ويفعلونه هنا إذا حجزوا تجربتك.
                </label>
                <textarea
                  value={attractionDesc}
                  onChange={(e) => setAttractionDesc(e.target.value)}
                  placeholder="أدخل وصفاً مفصلاً لعامل الجذب والأنشطة..."
                  maxLength={1000}
                  rows={4}
                  className="w-full p-4 bg-white border border-gray-250 rounded-2xl text-xs focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right leading-relaxed"
                />
                <div className="flex justify-end text-[10px] text-gray-400 font-bold">
                  {1000 - attractionDesc.length} حرف متبقية.
                </div>
              </div>

              {/* Time Spent */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-gray-600">كم من الوقت يقضيه المسافرون عادةً هنا؟</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={durationValue}
                    onChange={(e) => setDurationValue(Number(e.target.value))}
                    disabled={passBy}
                    className="w-24 py-2.5 px-3 bg-white border border-gray-250 rounded-xl text-center text-xs font-black text-gray-850 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] disabled:bg-gray-50 disabled:text-gray-300"
                  />
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as 'minutes' | 'hours')}
                    disabled={passBy}
                    className="py-2.5 px-3 bg-white border border-gray-250 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] disabled:bg-gray-50 disabled:text-gray-300"
                  >
                    <option value="minutes">دقائق</option>
                    <option value="hours">ساعات</option>
                  </select>

                  <label className="flex items-center gap-2 cursor-pointer select-none pl-4">
                    <input
                      type="checkbox"
                      checked={passBy}
                      onChange={(e) => setPassBy(e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-[hsl(var(--primary))] accent-[hsl(var(--primary))]"
                    />
                    <span className="text-xs font-black text-gray-655">مرور دون توقف.</span>
                  </label>
                </div>
              </div>

              {/* Admission Price Option */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-600">هل الدخول إلى هذا المكان متضمن في سعر الجولة؟</label>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="admission"
                      checked={admission === 'yes'}
                      onChange={() => setAdmission('yes')}
                      className="w-4 h-4 text-primary accent-[hsl(var(--primary))]"
                    />
                    <span className="text-xs font-bold text-gray-700">نعم</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="admission"
                      checked={admission === 'no'}
                      onChange={() => setAdmission('no')}
                      className="w-4 h-4 text-primary accent-[hsl(var(--primary))]"
                    />
                    <span className="text-xs font-bold text-gray-700">لا</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="admission"
                      checked={admission === 'free'}
                      onChange={() => setAdmission('free')}
                      className="w-4 h-4 text-primary accent-[hsl(var(--primary))]"
                    />
                    <span className="text-xs font-bold text-gray-700">غير متوفر (الدخول مجاني)</span>
                  </label>
                </div>
              </div>

              {/* Footer Modal Actions */}
              <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
                <ReusableButton variant="primary" type="submit">
                  تم
                </ReusableButton>
                <ReusableButton variant="outline" onClick={() => setIsAttractionModalOpen(false)}>
                  إلغاء
                </ReusableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MEAL MODAL */}
      {isMealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 px-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-[17px] font-black text-gray-800">إضافة وجبة</h3>
              <button onClick={() => setIsMealModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMealSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">اختر نوع الوجبة</label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full py-3 px-4 bg-white border border-gray-250 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                >
                  <option value="فطور">فطور</option>
                  <option value="غداء">غداء</option>
                  <option value="عشاء">عشاء</option>
                  <option value="وجبة خفيفة / سناك">وجبة خفيفة / سناك</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">التفاصيل (اختياري)</label>
                <input
                  type="text"
                  value={mealDetails}
                  onChange={(e) => setMealDetails(e.target.value)}
                  placeholder="مثال: وجبة نباتية، أسماك طازجة..."
                  className="w-full py-3 px-4 bg-white border border-gray-250 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right"
                />
              </div>
              <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
                <ReusableButton variant="primary" type="submit">
                  تم
                </ReusableButton>
                <ReusableButton variant="outline" onClick={() => setIsMealModalOpen(false)}>
                  إلغاء
                </ReusableButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ACCOMMODATION MODAL */}
      {isAccommodationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-5 px-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-[17px] font-black text-gray-800">إضافة سكن</h3>
              <button onClick={() => setIsAccommodationModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAccommodationSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">نوع السكن</label>
                <select
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                  className="w-full py-3 px-4 bg-white border border-gray-250 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                >
                  <option value="فندق">فندق</option>
                  <option value="مخيم / خيمة">مخيم / خيمة</option>
                  <option value="نزل ضيافة">نزل ضيافة</option>
                  <option value="منتجع">منتجع</option>
                  <option value="شقة خاصة">شقة خاصة</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-gray-600">اسم السكن / التفاصيل</label>
                <input
                  type="text"
                  value={accommodationName}
                  onChange={(e) => setAccommodationName(e.target.value)}
                  placeholder="مثال: فندق أوبروي الفيوم..."
                  required
                  className="w-full py-3 px-4 bg-white border border-gray-250 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right"
                />
              </div>
              <div className="pt-4 border-t border-gray-150 flex justify-end gap-3">
                <ReusableButton variant="primary" type="submit">
                  تم
                </ReusableButton>
                <ReusableButton variant="outline" onClick={() => setIsAccommodationModalOpen(false)}>
                  إلغاء
                </ReusableButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
