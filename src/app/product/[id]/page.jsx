"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Plus, Minus, ShoppingCart, Heart, ShieldCheck, 
  Truck, RefreshCcw, Star, CheckCircle2, Share2, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../../../store/cartStore"; // 👈 وارد کردن استور

export default function ProductPage() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  
  // توابع مورد نیاز از استور
  const addToCart = useCartStore((state) => state.addToCart);

  // برای جلوگیری از ارور Hydration در Next.js
  useEffect(() => {
    setHydrated(true);
  }, []);

  const product = {
    id,
    name: `تسبیح شماره ${id}`,
    price: 850000,
    oldPrice: 1200000,
    description: "تسبیح عقیق طبیعی یمنی با تراش دستی استادانه. این محصول از سنگ‌های کاملاً معدنی تهیه شده و برای آرامش‌بخشی و استفاده در ذکر بسیار مناسب است.",
    image: "https://dkstatics-public.digikala.com/digikala-products/8545c03f99fd5bcf388b3e10366af0d241455b73_1771338105.jpg",
    features: ["سنگ معدنی ۱۰۰٪ طبیعی", "تراش دستی یمنی", "بسته‌بندی چوبی نفیس", "تعداد ۳۳ دانه"],
  };

  const handleAddToCart = () => {
    // افزودن محصول به تعداد انتخاب شده
    for (let i = 0; i < count; i++) {
      addToCart(product);
    }
    
    // نمایش حالت موفقیت موقت
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPrice = (price) => new Intl.NumberFormat("fa-IR").format(price);

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* --- SECTION: IMAGE --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0f172a] p-4 rounded-[2.5rem] border border-white/10 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-[2rem] transform hover:scale-105 transition duration-700"
            />
            <button className="absolute top-8 left-8 p-3 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:text-green-400 transition">
              <Share2 size={20} />
            </button>
          </div>
        </motion.div>

        {/* --- SECTION: INFO --- */}
        <div className="space-y-8 text-right">
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-2 text-green-400 text-sm font-medium">
              <span>۴.۹ (۱۲۰ نظر)</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-l from-white to-gray-400">
              {product.name}
            </h1>
            
            <div className="flex items-center justify-end gap-4">
              <span className="text-gray-500 line-through text-lg">{formatPrice(product.oldPrice)}</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-green-400">{formatPrice(product.price)}</span>
                <span className="text-sm text-gray-400">تومان</span>
              </div>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg max-w-xl ml-auto">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-center justify-end gap-2 text-sm text-gray-300">
                <span>{feature}</span>
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
            ))}
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* PURCHASE BOX */}
          <div className="flex flex-col md:flex-row items-center justify-end gap-6">
            <div className="flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl gap-6">
              <button 
                onClick={() => setCount(count + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-green-500 hover:text-black transition"
              >
                <Plus size={18} />
              </button>
              <span className="text-xl font-bold w-4 text-center">{count}</span>
              <button 
                onClick={() => count > 1 && setCount(count - 1)}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl hover:bg-red-500 transition"
              >
                <Minus size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 md:flex-none flex items-center justify-center gap-3 font-black px-10 py-4 rounded-2xl transition-all active:scale-95 shadow-lg ${
                  isAdded 
                  ? "bg-emerald-600 text-white cursor-default" 
                  : "bg-green-500 hover:bg-green-400 text-[#020617] shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={20} />
                    اضافه شد!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    افزودن به سبد خرید
                  </>
                )}
              </button>
              <button className="p-4 border border-white/10 rounded-2xl hover:bg-white/5 transition group">
                <Heart size={24} className="group-hover:text-red-500 group-hover:fill-red-500 transition-all" />
              </button>
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-3 gap-4">
            <Badge icon={<Truck size={24} />} text="ارسال سریع" />
            <Badge icon={<ShieldCheck size={24} />} text="ضمانت اصالت" />
            <Badge icon={<RefreshCcw size={24} />} text="۷ روز بازگشت" />
          </div>
        </div>
      </div>
    </div>
  );
}

// کامپوننت کمکی برای Badgeها
function Badge({ icon, text }) {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center space-y-2 hover:bg-white/10 transition">
      <div className="text-green-400 flex justify-center">{icon}</div>
      <p className="text-[10px] text-gray-400">{text}</p>
    </div>
  );
}