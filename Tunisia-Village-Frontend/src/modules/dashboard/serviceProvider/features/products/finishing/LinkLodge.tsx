import React from 'react';

export default function LinkLodge() {
  return (
    <div className="space-y-4 text-right animate-in fade-in duration-300" dir="rtl">
      <h2 className="text-2xl font-black text-gray-900">ربط النزل</h2>
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-8 sm:p-12 text-center">
        <img
          src="/imgs/coming-soon.png"
          alt="قريباً"
          className="w-full max-w-xl h-auto mx-auto"
        />
        <h3 className="text-lg font-black text-gray-800 mt-4 mb-2">قريباً</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          ستتوفر خدمة ربط النزل قريباً.
        </p>
      </div>
    </div>
  );
}
