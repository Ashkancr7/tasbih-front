import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazir = localFont({
  src: [
    {
      path: "../assets/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "فروشگاه تسبیح | Tasbih Shop",
  description: "خرید انواع تسبیح‌های دست‌ساز و سنگ‌های قیمتی",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazir.className} ${vazir.className} bg-gray-50 text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}