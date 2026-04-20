"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Search, LayoutGrid, List } from "lucide-react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

// دیتای محصولات (معمولاً این رو از یک فایل مرکزی یا API می‌خونی)
const ALL_PRODUCTS = [
  { id: 1, category: "عقیق", name: "عقیق سرخ یمنی", price: 850000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 4.8 },
  { id: 2, category: "شاه‌مقصود", name: "شاه مقصود جلال‌آباد", price: 2450000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 5.0 },
  { id: 3, category: "فیروزه", name: "فیروزه نیشابور شجری", price: 1100000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 4.9 },
  { id: 4, category: "سندلوس", name: "سندلوس آلمانی کهنه", price: 3200000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 4.7 },
  { id: 5, category: "عقیق", name: "عقیق کبود خطی", price: 950000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 4.6 },
  { id: 6, category: "یاقوت", name: "تسبیح یاقوت زامبیا", price: 5800000, image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg", rating: 5.0 },
];

const CATEGORIES = ["همه", "عقیق", "شاه‌مقصود", "فیروزه", "سندلوس", "یاقوت"];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("همه");

  // فیلتر کردن محصولات بر اساس دسته‌بندی
  const filteredProducts = activeCategory === "همه" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#020617] min-h-screen text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* --- بخش سربرگ (Header) --- */}
        <header className="text-right mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black">
            کلکسیون <span className="text-emerald-400">تسبیح‌ها</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mr-0 ml-auto">
            ارزشمندترین سنگ‌های جهان را در قالب تسبیح‌های دست‌ساز برای شما گردآوری کرده‌ایم. 
            هر دانه، داستانی از طبیعت است.
          </p>
        </header>

        {/* --- نوار ابزار (Toolbar) --- */}
        <section className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white/5 p-4 rounded-[2rem] border border-white/10 mb-12">
          {/* فیلتر دسته‌بندی */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-emerald-500 text-[#020617] shadow-lg shadow-emerald-500/20" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ابزارهای جستجو و مرتب‌سازی */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="جستجوی محصول..."
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 pr-12 pl-4 text-sm focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              <SlidersHorizontal size={20} className="text-emerald-400" />
            </button>
          </div>
        </section>

        {/* --- گرید محصولات --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- حالت خالی (اگر محصولی نبود) --- */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">محصولی در این دسته‌بندی پیدا نشد.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}