import type { Metadata } from "next";
import type { ReactNode } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import Script from "next/script";
import QueryProvider from "@/src/providers/query-provider";
import { ThemeProvider } from "@/src/providers/theme-provider";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
  variable: "--font-ibmArabic",
  display: "swap",
});
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: 'الفيوم - كل رحلة تُحدث تغييرًا',
  description: 'اكتشف قلب الفيوم - حيث تلتقي الطبيعة بعراقة التاريخ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={` ${ibmArabic.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-village"
          enableSystem={false}
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
        <Script
          src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}

