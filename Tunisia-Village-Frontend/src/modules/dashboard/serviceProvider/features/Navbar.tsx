"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Search, LogOut, Menu, User } from 'lucide-react';
import { navigationConfig } from '../config/navigation.config';

interface NavbarProps {
  onMenuToggle?: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const pathname = usePathname() || '';
  const router = useRouter();

  // Determine active tab
  const getActiveTabId = () => {
    // If pathname matches exactly /dashboard or is one of the dashboard sub-paths
    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/overview') || pathname.startsWith('/dashboard/activities')) {
      return 'dashboard';
    }
    const activeItem = navigationConfig.find(
      item => item.id !== 'dashboard' && pathname.startsWith(item.path)
    );
    return activeItem ? activeItem.id : 'dashboard';
  };

  const activeTabId = getActiveTabId();

  const handleLogout = () => {
    // Here we can trigger the logout mutation, for now let's just clear cookies or redirect
    router.push('/login');
  };

  return (
    <header className="w-full bg-card border-b border-border sticky top-0 z-50 shadow-xs transition-all duration-normal" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Section: Logo & Brand */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 active:scale-95 transition-transform">
              <div className="w-12 h-12 relative flex items-center justify-center bg-primary/10 rounded-2xl overflow-hidden border border-primary/20">
                <Image 
                  src="/imgs/logo.png" 
                  alt="Anas Logo" 
                  width={38} 
                  height={38} 
                  className="object-contain" 
                />
              </div>
              <span className="text-xl font-black text-foreground tracking-wide font-heading">أنس</span>
            </Link>
          </div>

          {/* Middle Section: Dynamic Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-2 px-1">
            {navigationConfig.map((item) => {
              const isActive = activeTabId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.sidebarSections && item.sidebarSections.length > 0 ? item.sidebarSections[0].items[0].path : item.path}
                  className={`px-4 py-2.5 rounded-2xl text-[15px] font-extrabold transition-all duration-200 whitespace-nowrap active:scale-[0.98] ${
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Logout Tab */}
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-2xl text-[15px] font-extrabold text-destructive hover:text-destructive/90 hover:bg-destructive/10 transition-all duration-200 whitespace-nowrap active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <LogOut size={16} />
              <span>تسجيل الخروج</span>
            </button>
          </nav>

          {/* Left Section: Search and Utilities */}
          <div className="flex items-center gap-3">
            {/* Search Input Box */}
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="بحث..."
                className="w-56 py-2.5 pr-10 pl-4 bg-muted border border-border/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card focus:border-transparent transition-all placeholder-muted-foreground text-foreground"
              />
              <div className="absolute right-3.5 text-muted-foreground">
                <Search size={18} />
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden p-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
              <Search size={20} />
            </button>

            {/* User Profile / Notification Placeholder */}
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer">
              <User size={20} />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
