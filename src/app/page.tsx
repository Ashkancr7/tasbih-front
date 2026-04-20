"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Diamond, Truck, Hammer } from "lucide-react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import Footer from '../components/Footer';

// ۱. دیتاها رو معمولاً در یک فایل ثابت (Constants) یا خروجی API نگه می‌داریم
const PRODUCTS = [
  {
    id: 1,
    name: "تسبیح عقیق یمنی اصل",
    description: "تراش دستی هنرمندان یمنی، کاملاً طبیعی با رگه‌های سرخ و کیفیت فوق‌العاده",
    price: 850000,
    oldPrice: 1200000,
    discount: true,
    rating: 4.9,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
  {
    id: 2,
    name: "شاه مقصود کلکسیونی",
    description: "سنگ کمیاب جلال‌آباد، ۳۳ دانه، تراش زیتونی بسیار دقیق و خیره‌کننده",
    price: 2450000,
    rating: 5.0,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
  {
    id: 3,
    name: "تسبیح فیروزه نیشابور",
    description: "فیروزه شجری نیشابور با نقره‌کوبی اعلا و دانه‌های کاملاً یکدست",
    price: 1100000,
    rating: 4.8,
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
  },
];

const FEATURES = [
  {
    title: "اصالت تضمینی",
    desc: "ارائه شناسنامه معتبر برای تمامی سنگ‌ها",
    icon: <Diamond className="text-emerald-400" size={32} />,
  },
  {
    title: "ارسال اکسپرس",
    desc: "بسته‌بندی نفیس و ارسال در کمتر از ۴۸ ساعت",
    icon: <Truck className="text-emerald-400" size={32} />,
  },
  {
    title: "ساخت سفارشی",
    desc: "تغییر دانه و منجوق طبق سلیقه شما",
    icon: <Hammer className="text-emerald-400" size={32} />,
  },
];

// انیمیشن‌های کانتینر
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {

  const router = useRouter();


  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden">
      {/* افکت نوری پس‌زمینه برای عمق دادن به صفحه */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10">
        <HeroSection />

        {/* 🟡 Products Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <header className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-6">
            <div className="text-center md:text-right space-y-2">
              {/* <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                SHOP THE COLLECTION
              </div> */}
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                محصولات <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">موجود</span>
              </h2>
              <p className="text-gray-400 max-w-md">گلچینی از نفیس‌ترین تسبیح‌های دست‌ساز با سنگ‌های قیمتی و نیمه‌قیمتی</p>
            </div>
            
            <button 
                onClick={() => router.push("/products")}

              className="group flex items-center gap-2 bg-white/5 hover:bg-emerald-500 hover:text-white border border-white/10 transition-all duration-300 px-6 py-3 rounded-2xl font-bold text-sm">
              مشاهده همه کلکسیون
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </header>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {PRODUCTS.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ⚪️ Features Section (Refined) */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-white/[0.02] border-y border-white/5 shadow-inner" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {FEATURES.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5"
                >
                  <div className="p-4 bg-[#020617] rounded-2xl border border-white/10 shadow-xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-50">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}