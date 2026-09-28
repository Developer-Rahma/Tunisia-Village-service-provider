"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { navigationConfig } from '../config/navigation.config';
import { ThemeSelector } from '@/src/shared/components/common/ThemeSelector';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || '';

  // Determine active tab
  const getActiveTab = () => {
    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/overview') || pathname.startsWith('/dashboard/activities')) {
      return navigationConfig.find(item => item.id === 'dashboard');
    }
    return navigationConfig.find(
      item => item.id !== 'dashboard' && pathname.startsWith(item.path)
    );
  };

  const activeTab = getActiveTab() || navigationConfig[0];
  const sections = activeTab.sidebarSections || [];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        dir="rtl"
        className={`fixed inset-y-0 right-0 z-40 w-72 bg-card border-l border-border flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Sidebar Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <span className="font-extrabold text-foreground">{activeTab.label}</span>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Header (Title) */}
        <div className="hidden lg:block px-8 py-5 border-b border-border">
          <div className="relative pb-2 inline-block">
            <h2 className="text-xl font-extrabold text-primary tracking-wide font-heading">
              {activeTab.label}
            </h2>
            <div className="absolute bottom-0 right-0 left-0 h-[3px] bg-primary rounded-full" />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="space-y-2">
                {/* Section Header */}
                <span className="text-[15px] font-black text-foreground block pb-1 border-b border-border font-heading">
                  {section.title}
                </span>

                {/* Section Items */}
                <ul className="space-y-1 pr-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          onClick={onClose}
                          className={`block py-2 text-sm font-semibold transition-all duration-200 hover:pr-1 ${
                            isActive
                              ? 'text-accent font-bold'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {sections.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                لا توجد أقسام فرعية
              </div>
            )}
          </div>

          {/* Theme Selector Widget */}
          <div className="pt-6 border-t border-border mt-8">
            <ThemeSelector />
          </div>
        </div>
      </aside>
    </>
  );
}

