"use client";

import React, { useState } from 'react';
import { Lightbulb, Info, ChevronDown, MapPin, Search, Plus, Trash2, ArrowRight } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect, { SelectOption } from '@/src/shared/components/common/Selection/ReusableSelect';

export default function Meeting() {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [meetingType, setMeetingType] = useState<string>('meeting_point');
  const [selectedLocations, setSelectedLocations] = useState<string[]>(['hotel', 'sea_port']);
  const [hotelInfoChoice, setHotelInfoChoice] = useState<'radius' | 'individual'>('radius');
  
  // Step 2 Map State
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState('1km');
  const [addedRegions, setAddedRegions] = useState<string[]>(['الفيوم (Faiyum)']);
  const [isRadiusDropdownOpen, setIsRadiusDropdownOpen] = useState(false);

  const meetingTypeOptions: SelectOption[] = [
    { value: 'meeting_point', label: 'نقابل جميع المسافرين في نقطة تجمع محددة' },
    { value: 'hotel_pickup', label: 'نقوم باستلام المسافرين من فندقهم/أماكن إقامتهم' }
  ];

  const locationOptions: SelectOption[] = [
    { value: 'hotel', label: 'فندق', starred: true },
    { value: 'sea_port', label: 'ميناء بحري', starred: true },
    { value: 'airport', label: 'ميناء جوي' },
    { value: 'other', label: 'أخرى' }
  ];

  const radiusOptions = [
    { value: '1km', label: 'قطر 1 كم' },
    { value: '2miles', label: 'قطر 2 ميل' },
    { value: '100m', label: 'قطر 100 م' }
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
  const activeRadiusLabel = radiusOptions.find(opt => opt.value === radius)?.label || 'قطر 1 كم';

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
    if (selectedLocations.includes('hotel') && hotelInfoChoice === 'radius') {
      setStep(2);
    } else {
      alert('تم حفظ البيانات بنجاح!');
    }
  };

  return (
    <div className="space-y-8 text-right animate-in fade-in duration-300" dir="rtl">
      {/* Header Breadcrumbs */}
      <div className="text-sm font-bold text-gray-400 flex items-center gap-1.5 justify-start">
        <span>المنتجات</span>
        <span>&gt;</span>
        <span>ب-محتوى المنتج</span>
        <span>&gt;</span>
        <span className="text-primary">1.ب.الاجتماع والاستلام</span>
      </div>

      {step === 1 ? (
        <>
          {/* Main Title */}
          <div className="bg-slate-50/50 p-4 py-6 rounded-2xl text-center max-w-xl mx-auto border border-slate-100">
            <h1 className="text-xl md:text-2xl font-black text-gray-800">
              أخبرنا كيف وأين تلتقي بمسافريك
            </h1>
          </div>

          {/* Did You Know Box */}
          <div className="border border-primary/30 bg-white rounded-3xl p-5 shadow-xs flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
              <Lightbulb className="text-primarymber-500 fill-amber-500/20" size={24} />
            </div>
            <div className="space-y-1">
              <h2 className="text-[17px] font-black text-gray-800">هل تعلم؟</h2>
              <p className="text-xs text-primary font-bold leading-relaxed">
                يرغب المسافرون في حجز المنتجات ذات مواقع الاستلام الدقيقة حتى يتمكنوا من التخطيط ليومهم. وإضافة نقاط لقاء واستلام محددة ستساعدهم في العثور على منتجك.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-8 max-w-4xl bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-xs">
            {/* Section 1: How do you meet your travelers */}
            <div className="space-y-3">
              <label className="block text-[15px] font-black text-gray-800">
                -كيف تقابل مسافريك؟
              </label>
              <ReusableSelect
                placeholder="إختر..."
                options={meetingTypeOptions}
                selectedValues={[meetingType]}
                onChange={(vals) => setMeetingType(vals[0] || 'meeting_point')}
                multiple={false}
                starredOptionSupport={false}
              />
            </div>

            {/* Section 2: Where do you pick up travelers */}
            <div className="space-y-3">
              <label className="block text-[15px] font-black text-gray-800">
                -أين تقوم بإستقبال مسافريك؟
              </label>
              <ReusableSelect
                placeholder="مكان إستقبال المسافرين"
                options={locationOptions}
                selectedValues={selectedLocations}
                onChange={setSelectedLocations}
                multiple={true}
                starredOptionSupport={true}
              />
            </div>

            {/* Conditional Hotel pickup settings */}
            {selectedLocations.includes('hotel') && (
              <div className="border-t border-gray-100 pt-6 space-y-4 animate-in slide-in-from-top duration-300">
                <label className="block text-[15px] font-black text-gray-800">
                  -هل تريد إدخال معلومات اختيار الفندق الخاص بك؟
                </label>
                
                <div className="space-y-3 max-w-3xl">
                  {/* Option 1: Area Radius */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                    hotelInfoChoice === 'radius'
                      ? 'border-[hsl(var(--primary))] bg-primary/5'
                      : 'border-gray-150 hover:bg-gray-50/50'
                  }`}>
                    <input
                      type="radio"
                      name="hotelInfoChoice"
                      checked={hotelInfoChoice === 'radius'}
                      onChange={() => setHotelInfoChoice('radius')}
                      className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-[hsl(var(--primary))] accent-[hsl(var(--primary))]"
                    />
                    <div className="space-y-1">
                      <span className="block font-black text-gray-800 text-sm">
                        أريد تحديد منطقة عامة للفنادق التي سأستقبل منها
                      </span>
                      <span className="block text-xs text-gray-400 font-bold leading-normal">
                        سأختار دائرة نصف قطرها في مدينة أو حي أو عنوان محدد وأستقبل من داخل تلك الدائرة
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Individual Add */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                    hotelInfoChoice === 'individual'
                      ? 'border-[hsl(var(--primary))] bg-primary/5'
                      : 'border-gray-150 hover:bg-gray-50/50'
                  }`}>
                    <input
                      type="radio"
                      name="hotelInfoChoice"
                      checked={hotelInfoChoice === 'individual'}
                      onChange={() => setHotelInfoChoice('individual')}
                      className="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-[hsl(var(--primary))] accent-[hsl(var(--primary))]"
                    />
                    <div className="space-y-1">
                      <span className="block font-black text-gray-800 text-sm">
                        أريد إضافة المواقع واحدة تلو الأخرى
                      </span>
                      <span className="block text-xs text-gray-400 font-bold leading-normal">
                        وسأضيف الفنادق بشكل فردي
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex justify-start">
              <ReusableButton 
                variant={selectedLocations.includes('hotel') && hotelInfoChoice === 'radius' ? 'primary' : 'secondary'} 
                onClick={handleNextStep}
              >
                {selectedLocations.includes('hotel') && hotelInfoChoice === 'radius' ? 'التالي' : 'الحفظ و الإستمرار'}
              </ReusableButton>
            </div>
          </div>
        </>
      ) : (
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
                <div className="space-y-2">
                  <label className="block text-sm font-black text-gray-700">تحديد النطاق (نصف القطر):</label>
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
                            className="w-full text-right p-3 hover:bg-gray-50 text-sm font-bold text-gray-700"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Region Search Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-black text-gray-700">قم بالبحث عن المنطقة:</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن مدينة، حي، أو عنوان..."
                        className="w-full py-3 pr-4 pl-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))] font-bold text-gray-800 text-right"
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
                  <div className="space-y-2 pt-2">
                    <span className="block text-xs font-black text-gray-400">المناطق المحددة الحالية:</span>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
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
      )}
    </div>
  );
}