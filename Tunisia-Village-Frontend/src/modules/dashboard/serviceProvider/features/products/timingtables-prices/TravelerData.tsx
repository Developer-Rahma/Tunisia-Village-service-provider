"use client";

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ReusableButton from '@/src/shared/components/common/Buttons/ReusableButton';
import ReusableSelect from '@/src/shared/components/common/Selection/ReusableSelect';

type PricingMode = 'per_traveler' | 'fixed' | '';

const travelerTypes = ['بالغ', 'طفل', 'طفل صغير', 'رضيع', 'كبير السن'];
const ageOptions = [
  { label: 'بدون حد أدنى', value: 'none' },
  { label: '12 سنة', value: '12' },
  { label: '16 سنة', value: '16' },
  { label: '18 سنة', value: '18' },
];
const vehicleOptions = [
  { label: 'سيارة', value: 'car' },
  { label: 'حافلة صغيرة', value: 'minibus' },
  { label: 'حافلة', value: 'bus' },
  { label: 'دراجة', value: 'bike' },
  { label: 'أخرى', value: 'other' },
];

export default function TravelerData() {
  const [pricingMode, setPricingMode] = useState<PricingMode>('');
  const [stage, setStage] = useState<'choice' | 'traveler-prices' | 'fixed-pricing' | 'vehicle'>('choice');
  const [prices, setPrices] = useState<Record<string, { price: string; quantity: string }>>(
    Object.fromEntries(travelerTypes.map((type) => [type, { price: '', quantity: '' }]))
  );
  const [minAge, setMinAge] = useState('none');
  const [fixedPricing, setFixedPricing] = useState('per_group');
  const [vehicle, setVehicle] = useState('');

  const continueFromChoice = () => {
    if (!pricingMode) return;
    setStage(pricingMode === 'per_traveler' ? 'traveler-prices' : 'fixed-pricing');
  };

  const continueToVehicle = () => setStage('vehicle');
  const save = () => {
    if (!vehicle) return;
    alert('تم حفظ بيانات المسافرين والتسعير بنجاح!');
  };

  const updatePrice = (type: string, field: 'price' | 'quantity', value: string) => {
    setPrices((current) => ({ ...current, [type]: { ...current[type], [field]: value } }));
  };

  return (
    <div className="min-h-full space-y-5 rounded-2xl bg-white px-4 py-5 text-right animate-in fade-in duration-300 md:px-8" dir="rtl">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 pb-2" dir="ltr">
        <span className="text-sm font-bold text-primary">80%</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-4/5 rounded-full bg-emerald-500" /></div>
      </div>

      <h1 className="mx-auto w-fit max-w-full bg-muted px-5 py-2 text-center text-lg font-bold text-primary md:text-xl">
        أخبرنا عن جداول منتجاتك وخيارات التسعير
      </h1>

      <div className="mx-auto min-h-[250px] max-w-5xl rounded-xl px-3 py-4 md:px-6">
        {stage === 'choice' && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">هل يختلف سعر المنتج حسب عدد المسافرين؟</h2>
            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input type="radio" name="pricing-mode" checked={pricingMode === 'per_traveler'} onChange={() => setPricingMode('per_traveler')} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                نعم
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input type="radio" name="pricing-mode" checked={pricingMode === 'fixed'} onChange={() => setPricingMode('fixed')} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                لا
              </label>
            </div>
          </section>
        )}

        {stage === 'traveler-prices' && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Info size={16} className="shrink-0" />
              <p>قم بتحديد أسعار منتجاتك التي يقدمها المسافر</p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <div className="grid min-w-[560px] grid-cols-[minmax(150px,1fr)_1fr_1fr_56px] items-center gap-2 bg-muted px-3 py-2 text-sm font-semibold text-primary">
                <span>الفئة</span><span>السعر</span><span>عدد المسافرين</span><span className="text-center">تفعيل</span>
              </div>
              {travelerTypes.map((type, index) => (
                <div key={type} className={`grid min-w-[560px] grid-cols-[minmax(150px,1fr)_1fr_1fr_56px] items-center gap-2 px-3 py-1.5 text-sm ${index % 2 === 0 ? 'bg-muted/50' : 'bg-white'}`}>
                  <span className="text-foreground">{type}</span>
                  <input aria-label={`السعر لفئة ${type}`} type="number" min="0" value={prices[type].price} onChange={(event) => updatePrice(type, 'price', event.target.value)} placeholder="السعر" className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input aria-label={`العدد لفئة ${type}`} type="number" min="0" value={prices[type].quantity} onChange={(event) => updatePrice(type, 'quantity', event.target.value)} placeholder="العدد" className="w-full rounded-md border border-border bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <label className="flex justify-center"><input aria-label={`تفعيل فئة ${type}`} type="checkbox" defaultChecked={index === 0} className="h-4 w-4 accent-[hsl(var(--primary))]" /></label>
                </div>
              ))}
            </div>
            <div className="max-w-sm space-y-2">
              <label className="block text-sm font-semibold text-foreground">ما هو الحد الأدنى لعمر المسافر؟</label>
              <ReusableSelect placeholder="اختر الحد الأدنى للعمر" options={ageOptions} selectedValues={[minAge]} onChange={(values) => setMinAge(values[0] || 'none')} multiple={false} starredOptionSupport={false} compact identityColor />
            </div>
          </section>
        )}

        {stage === 'fixed-pricing' && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">كيف تقوم بتسعير منتجاتك؟</h2>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input type="radio" name="fixed-pricing" checked={fixedPricing === 'per_group'} onChange={() => setFixedPricing('per_group')} className="h-4 w-4 accent-[hsl(var(--primary))]" />
              السعر للمجموعة
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input type="radio" name="fixed-pricing" checked={fixedPricing === 'per_booking'} onChange={() => setFixedPricing('per_booking')} className="h-4 w-4 accent-[hsl(var(--primary))]" />
              السعر للحجز بالكامل
            </label>
          </section>
        )}

        {stage === 'vehicle' && (
          <section className="mx-auto max-w-2xl space-y-3">
            <label className="block text-base font-semibold text-foreground">اختر نوع المركبة:</label>
            <ReusableSelect placeholder="نوع المركبة" options={vehicleOptions} selectedValues={vehicle ? [vehicle] : []} onChange={(values) => setVehicle(values[0] || '')} multiple={false} starredOptionSupport={false} compact identityColor />
          </section>
        )}
      </div>

      <div className="flex justify-center gap-3">
        {stage !== 'choice' && (
          <ReusableButton type="button" variant="outline" onClick={() => setStage(stage === 'vehicle' ? (pricingMode === 'per_traveler' ? 'traveler-prices' : 'fixed-pricing') : 'choice')}>
            السابق
          </ReusableButton>
        )}
        {stage === 'choice' && <ReusableButton type="button" onClick={continueFromChoice}>حفظ والاستمرار</ReusableButton>}
        {(stage === 'traveler-prices' || stage === 'fixed-pricing') && <ReusableButton type="button" onClick={continueToVehicle}>حفظ والاستمرار</ReusableButton>}
        {stage === 'vehicle' && <ReusableButton type="button" onClick={save}>حفظ والاستمرار</ReusableButton>}
      </div>
    </div>
  );
}
