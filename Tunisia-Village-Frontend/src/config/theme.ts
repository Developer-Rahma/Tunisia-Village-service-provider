/**
 * Brand & Theme Metadata Configuration
 * 
 * Configures the tenant/brand details and lists all available themes in the design system.
 */

export interface ThemeConfig {
  id: string;
  name: string;
  className: string;
  description: string;
  primaryColor: string;
}

export const BrandConfig = {
  name: "القرية التونسية / Tunisia Village",
  logo: "/logo.png",
  logoMark: "/logomark.png",
  defaultTheme: "theme-village",
  defaultRadius: "12px",
};

export const ThemesList: ThemeConfig[] = [
  {
    id: "village",
    name: "القرية (العادي)",
    className: "theme-village",
    description: "الأخضر الزيتوني التقليدي مع ألوان الرمل الدافئة لقرى تونس",
    primaryColor: "#1a7d5a",
  },
  {
    id: "sidi-bou",
    name: "سيدي بوسعيد",
    className: "theme-sidi-bou",
    description: "الأزرق والرمال البيضاء الناصعة المستوحاة من سيدي بوسعيد",
    primaryColor: "#2885AC",
  },
  {
    id: "carthage",
    name: "قرطاج",
    className: "theme-carthage",
    description: "الأرجواني الملكي والذهبي المستوحى من حضارة قرطاج القديمة",
    primaryColor: "#7C3AED",
  },
];
