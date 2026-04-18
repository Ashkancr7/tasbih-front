"use client";

import { ShoppingBag, ArrowLeft, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// --- داده‌های بخش آمار برای مدیریت راحت‌تر ---
const STATS = [
  { label: "محصول خاص", value: "+۱۲۰" },
  { label: "مشتری وفادار", value: "+۵۰۰" },
  {
    label: "رضایت مشتری",
    value: "۴.۹",
    icon: <Star size={14} className="text-yellow-400 fill-yellow-400" />,
  },
];

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-[#020617] overflow-hidden min-h-[90vh] flex items-center">
      {/* 1. پترن پس‌زمینه و هاله‌های نوری هوشمندتر */}
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#22c55e_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-green-500/20 blur-[150px] rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* --- بخش تصویر (سمت چپ در حالت دسکتاپ) --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:w-1/2 group"
          >
            {/* قاب تزئینی متحرک */}
            <div className="absolute -inset-4 border border-green-500/20 rounded-[2rem] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg"
                alt="تسبیح نفیس"
                className="w-full object-cover aspect-[4/5] md:aspect-square transform group-hover:scale-110 transition duration-700"
              />
              {/* Overlay روی عکس */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* کارت شناور حرفه‌ای */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 right-8 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 shadow-2xl"
            >
              <div className="bg-green-500 p-2 rounded-xl">
                <Sparkles size={20} className="text-black" />
              </div>
              <div>
                <p className="text-white text-xs font-medium">
                  پیشنهاد ویژه امروز
                </p>
                <p className="text-green-400 text-sm font-bold">
                  تسبیح شاه مقصود اصل
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* --- بخش متن (سمت راست) --- */}
          <div className="text-right text-white space-y-10 lg:w-1/2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-green-400 text-sm font-medium"
            >
              <Sparkles size={16} />
              فروشگاه تخصصی تسبیح‌های سنگی و دست‌ساز
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black leading-[1.15]"
            >
              تسبیح‌های <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-200">
                خاص و اصیل
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mr-0 ml-auto"
            >
              مجموعه‌ای بی‌نظیر از سنگ‌های قیمتی تراش‌خورده. زیبایی و آرامش را
              در دستان خود احساس کنید.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-start lg:justify-start flex-row-reverse"
            >
              <button className="group relative bg-green-500 hover:bg-green-400 text-[#020617] font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] overflow-hidden">
                <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700"></div>
                <ShoppingBag size={20} />
                مشاهده محصولات
              </button>

              <button
                onClick={() => router.push("/about")}
                className="border border-white/10 hover:border-white/20 hover:bg-white/5 px-8 py-4 rounded-2xl transition-all font-medium flex items-center gap-2 group"
              >
                درباره ما
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
            </motion.div>

            {/* بخش آمار */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5"
            >
              {STATS.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-1 justify-end">
                    {stat.icon && stat.icon}
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
