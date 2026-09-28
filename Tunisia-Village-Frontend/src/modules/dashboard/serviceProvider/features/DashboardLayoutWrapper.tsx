"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans" dir="rtl">
      {/* Dynamic Navbar */}
      <Navbar onMenuToggle={() => setIsSidebarOpen(true)} />

      {/* Main Workspace: Sidebar + Content */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6 items-start animate-fade-in">
        
        {/* Dynamic Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Content Area */}
        <main className="flex-1 bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 min-h-[70vh] overflow-x-hidden transition-all duration-normal">
          {children}
        </main>
        
      </div>
    </div>
  );
}
