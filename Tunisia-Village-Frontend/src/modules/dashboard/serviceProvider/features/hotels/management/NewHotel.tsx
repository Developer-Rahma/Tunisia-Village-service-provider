import React from 'react';

export default function NewHotel() {
  return (
    <div className="space-y-4 text-right animate-in fade-in duration-300" dir="rtl">
      <h2 className="text-2xl font-black text-gray-900">إضافة فندق جديد</h2>
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl">
          ℹ️
        </div>
        <h3 className="text-lg font-black text-gray-800 mb-2">محتوى تجريبي</h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          هذا نموذج تجريبي لصفحة (إضافة فندق جديد). سيتم ربطه بالبيانات لاحقاً.
        </p>
      </div>
    </div>
  );
}
