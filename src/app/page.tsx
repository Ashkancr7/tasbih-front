"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import Footer from '../components/Footer'
import { ArrowLeft } from "lucide-react";

// ۱. مدیریت داده‌ها در خارج از بدنه اصلی (بعداً می‌تواند از API بیاید)
const PRODUCTS = [
  {
    id: 1,
    name: "تسبیح عقیق یمنی اصل",
    description: "تراش دستی هنرمندان یمنی، کاملاً طبیعی با رگه‌های سرخ",
    price: 850000,
    oldPrice: 1200000,
    discount: true,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
  {
    id: 2,
    name: "شاه مقصود کلکسیونی",
    description: "سنگ کمیاب جلال‌آباد، ۳۳ دانه، تراش زیتونی بسیار دقیق",
    price: 2450000,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
  {
    id: 3,
    name: "تسبیح فیروزه نیشابور",
    description: "فیروزه شجری نیشابور با نقره‌کوبی اعلا",
    price: 1100000,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
];

// ۲. تنظیمات انیمیشن برای ردیف محصولات
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // هر کارت با ۰.۲ ثانیه فاصله ظاهر می‌شود
  },
};

export default function Home() {
  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-green-500/30">
      <Navbar />

      <main>
        {/* 🟢 Hero Section */}
        <HeroSection />

        {/* 🟡 Products Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-24">
          
          {/* تیتر بخش محصولات با دیزاین حرفه‌ای */}
          <div className="flex items-end justify-between mb-12 border-r-4 border-green-500 pr-4">
            <div className="text-right">
              <h2 className="text-3xl md:text-4xl font-black">
                محصولات <span className="text-green-400">برگزیده</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm md:text-base">گلچینی از نفیس‌ترین تسبیح‌های دست‌ساز</p>
            </div>
            
            <button className="hidden md:flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-bold text-sm">
              مشاهده همه محصولات
              <ArrowLeft size={18} />
            </button>
          </div>

          {/* گرید محصولات با انیمیشن ورود */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {PRODUCTS.map((p) => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>

          {/* دکمه مشاهده همه در موبایل */}
          <div className="mt-12 md:hidden">
            <button className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              مشاهده همه محصولات
              <ArrowLeft size={18} />
            </button>
          </div>
        </section>

        {/* ⚪️ بخش ویژگی‌ها (بونوس برای حرفه‌ای‌تر شدن) */}
        <section className="bg-white/5 border-y border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-green-400 text-3xl font-bold">اصالت تضمینی</div>
              <p className="text-gray-500 text-sm">ارائه شناسنامه معتبر برای سنگ‌های قیمتی</p>
            </div>
            <div className="space-y-3 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <div className="text-green-400 text-3xl font-bold">ارسال اکسپرس</div>
              <p className="text-gray-500 text-sm">بسته‌بندی نفیس و ارسال در کمتر از ۴۸ ساعت</p>
            </div>
            <div className="space-y-3">
              <div className="text-green-400 text-3xl font-bold">ساخت سفارشی</div>
              <p className="text-gray-500 text-sm">امکان تغییر دانه و منجوق طبق سلیقه شما</p>
            </div>
          </div>
        </section>
      </main>

      {/* یک فوتر بسیار ساده و شیک */}
      {/* <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5">
        © ۲۰۲۶ تسبیح‌شاپ | تمامی حقوق برای سنگ‌های اصیل محفوظ است.
      </footer> */}

      <Footer />
    </div>
  );
}